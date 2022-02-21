// noinspection TypeScriptValidateJSTypes

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Item } from "../../interfaces/item";
import { SearchResultItem } from "../../pages/shoppingList/search";
import { StandardItem } from "../../interfaces/standardItem";
import { AuthRequest, AuthResponse } from "../../interfaces/authRequest";
import { RootState } from "../../app/store";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export const shoppinglistApi = createApi({
    reducerPath: "shoppinglistApi",
    tagTypes: ["items", "standardItems"],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://shoppinglist-backend.heidenis.com/api/v2/",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).persistedReducer.accessToken;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getItemById: builder.query<Item, number>({
            query: (id) => `item/${id}`,
        }),
        getAllItems: builder.query<Item[], void>({
            query: () => `item/all`,
            transformResponse: (response: Item[], meta, arg) =>
                [...response].sort((a: Item, b: Item) => {
                    return a.sequence - b.sequence;
                }),
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }) {
                try {
                    await cacheDataLoaded;

                    if (!process.env.REACT_APP_EVENTS_URL) throw new Error("Events url is not defined");
                    // @ts-ignore
                    const token = getState().persistedReducer.accessToken;

                    await fetchEventSource(process.env.REACT_APP_EVENTS_URL, {
                        onmessage(event) {
                            const eventData = JSON.parse(event.data);

                            if (event.event === "item.create") {
                                updateCachedData((draft) => {
                                    draft.push(eventData);
                                });
                            }
                            if (event.event === "item.update") {
                                updateCachedData((draft) => {
                                    const foundItem = draft.find((item) => item.id === eventData.id);
                                    if (foundItem) {
                                        Object.assign(foundItem, eventData);
                                    } else {
                                        draft.push(eventData);
                                    }
                                });
                            }
                            if (event.event === "item.updateSequences") {
                                updateCachedData((draft) => {
                                    draft.forEach((item) => {
                                        const foundSequenceItem = eventData.find(
                                            (sequenceItem: { id: number; sequence: number }) => sequenceItem.id === item.id
                                        );
                                        item.sequence = foundSequenceItem ? foundSequenceItem.sequence : item.sequence;
                                    });
                                    draft.sort((a: Item, b: Item) => {
                                        return a.sequence - b.sequence;
                                    });
                                });
                            }
                            if (event.event === "item.delete") {
                                updateCachedData((draft) => {
                                    const foundIndex = draft.findIndex((item) => item.id === eventData);
                                    if (foundIndex === -1) return;
                                    draft.splice(foundIndex, 1);
                                });
                            }
                            if (event.event === "item.deleteAll") {
                                updateCachedData(() => {
                                    return [];
                                });
                            }
                            if (event.event === "item.deleteChecked") {
                                updateCachedData((draft) => {
                                    return draft.filter((item) => item.status === 1);
                                });
                            }
                            console.log(event);
                        },
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                        credentials: "include",
                    });
                } catch (e) {}
            },
            providesTags: ["items"],
        }),
        search: builder.query<SearchResultItem[], string>({
            query: (query) => `search/${query}`,
        }),
        getStandardItemById: builder.query<StandardItem, number>({
            query: (id) => `standardItem/${id}`,
        }),
        getAllStandardItems: builder.query<StandardItem[], void>({
            query: () => `standardItem/all`,
        }),
        addItem: builder.mutation<Item, Partial<Item>>({
            query: (item) => ({
                url: `item`,
                method: "POST",
                body: item,
            }),
            async onQueryStarted(patch, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        shoppinglistApi.util.updateQueryData("getAllItems", undefined, (draft) => {
                            draft.push(data);
                        })
                    );
                } catch {}
            },
        }),
        updateItem: builder.mutation<Item, Partial<Item> & Pick<Item, "id">>({
            query: ({ id, ...patch }) => ({
                url: `item/${id}`,
                method: "PATCH",
                body: patch,
            }),
            onQueryStarted(item, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    shoppinglistApi.util.updateQueryData("getAllItems", undefined, (draft) => {
                        const foundItem = draft.find((draftItem) => draftItem.id === item.id);
                        if (foundItem) {
                            Object.assign(foundItem, item);
                        }
                    })
                );
                queryFulfilled.catch(patchResult.undo);
            },
        }),
        deleteItem: builder.mutation<void, number>({
            query: (id) => ({
                url: `item/${id}`,
                method: "DELETE",
            }),
            onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    shoppinglistApi.util.updateQueryData("getAllItems", undefined, (draft) => {
                        const itemIndex = draft.findIndex((item) => item.id === id);
                        if (itemIndex === -1) return;
                        draft.splice(itemIndex, 1);
                    })
                );
                queryFulfilled.catch(patchResult.undo);
            },
        }),
        deleteAllItems: builder.mutation<void, void>({
            query: () => ({
                url: `item/all`,
                method: "DELETE",
            }),
            async onQueryStarted(patch, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        shoppinglistApi.util.updateQueryData("getAllItems", undefined, (draft) => {
                            return [];
                        })
                    );
                } catch {}
            },
        }),
        deleteChecked: builder.mutation<void, void>({
            query: () => ({
                url: `item/checked`,
                method: "DELETE",
            }),
            async onQueryStarted(patch, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        shoppinglistApi.util.updateQueryData("getAllItems", undefined, (draft) => {
                            return draft.filter((item) => item.status === 1);
                        })
                    );
                } catch {}
            },
        }),
        updateSequences: builder.mutation<
            { id: number; sequence: number; error?: { key: string; message: string } }[],
            { id: number; sequence: number }[]
        >({
            query: (sequences) => ({
                url: `item/sequences`,
                method: "POST",
                body: sequences,
            }),
            onQueryStarted(sequences, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    shoppinglistApi.util.updateQueryData("getAllItems", undefined, (draft) => {
                        draft.forEach((item) => {
                            const foundSequenceItem = sequences.find((sequenceItem) => sequenceItem.id === item.id);
                            item.sequence = foundSequenceItem ? foundSequenceItem.sequence : item.sequence;
                        });
                        draft.sort((a: Item, b: Item) => {
                            return a.sequence - b.sequence;
                        });
                    })
                );
                queryFulfilled.catch(patchResult.undo);
            },
        }),
        checkItem: builder.mutation<Item, number>({
            query: (id) => ({
                url: `item/${id}/check`,
                method: "PATCH",
            }),
            onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    shoppinglistApi.util.updateQueryData("getAllItems", undefined, (draft) => {
                        const foundItem = draft.find((item) => item.id === id);
                        if (!foundItem) return;
                        foundItem.status = 2;
                    })
                );
                queryFulfilled.catch(patchResult.undo);
            },
        }),
        uncheckItem: builder.mutation<Item, number>({
            query: (id) => ({
                url: `item/${id}/uncheck`,
                method: "PATCH",
            }),
            onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    shoppinglistApi.util.updateQueryData("getAllItems", undefined, (draft) => {
                        const foundItem = draft.find((item) => item.id === id);
                        if (!foundItem) return;
                        foundItem.status = 1;
                    })
                );
                queryFulfilled.catch(patchResult.undo);
            },
        }),
        addStandardItem: builder.mutation<StandardItem, Partial<StandardItem>>({
            query: (standardItem) => ({
                url: `standardItem`,
                method: "POST",
                body: standardItem,
            }),
            async onQueryStarted(patch, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        shoppinglistApi.util.updateQueryData("getAllStandardItems", undefined, (draft) => {
                            draft.push(data);
                        })
                    );
                } catch {}
            },
        }),
        updateStandardItem: builder.mutation<StandardItem, Partial<StandardItem> & Pick<StandardItem, "id">>({
            query: ({ id, ...patch }) => ({
                url: `standardItem/${id}`,
                method: "PATCH",
                body: patch,
            }),
        }),
        deleteStandardItem: builder.mutation<void, number>({
            query: (id) => ({
                url: `standardItem/${id}`,
                method: "DELETE",
            }),
            onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    shoppinglistApi.util.updateQueryData("getAllStandardItems", undefined, (draft) => {
                        const standardItemIndex = draft.findIndex((standardItem) => standardItem.id === id);
                        if (standardItemIndex === -1) return;
                        draft.splice(standardItemIndex, 1);
                    })
                );
                queryFulfilled.catch(patchResult.undo);
            },
        }),
        deleteAllStandardItems: builder.mutation<void, void>({
            query: () => ({
                url: `standardItem/all`,
                method: "DELETE",
            }),
            async onQueryStarted(patch, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        shoppinglistApi.util.updateQueryData("getAllStandardItems", undefined, (draft) => {
                            return [];
                        })
                    );
                } catch {}
            },
        }),
        login: builder.mutation<AuthResponse, AuthRequest>({
            query: (credentials) => ({
                url: `authentication/login`,
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const {
    useGetItemByIdQuery,
    useGetAllItemsQuery,
    useSearchQuery,
    useGetStandardItemByIdQuery,
    useGetAllStandardItemsQuery,
    useAddItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
    useUpdateSequencesMutation,
    useDeleteAllItemsMutation,
    useDeleteCheckedMutation,
    useCheckItemMutation,
    useUncheckItemMutation,
    useAddStandardItemMutation,
    useUpdateStandardItemMutation,
    useDeleteStandardItemMutation,
    useDeleteAllStandardItemsMutation,
    useLoginMutation,
} = shoppinglistApi;
