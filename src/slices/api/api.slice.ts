import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { Item, SequenceItem } from "../../interfaces/item";
import { StandardItem } from "../../interfaces/standardItem";
import { AuthRequest, AuthResponse } from "../../interfaces/authRequest";
import type { RootState } from "../../app/store";
import { SearchResultItem } from "../../interfaces/SearchResultItem";

// We need this because Redux specifically requires void as arg type, which is normally invalid.
/* eslint-disable @typescript-eslint/no-invalid-void-type */

export const shoppingListApi = createApi({
    reducerPath: "shoppingListApi",
    tagTypes: ["items", "standardItems"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
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
            transformResponse: (response: Item[]) => [...response].sort((a: Item, b: Item) => a.sequence - b.sequence),
            async onCacheEntryAdded(_arg, { updateCachedData, cacheDataLoaded, getState }) {
                try {
                    await cacheDataLoaded;

                    // TODO: Create custom exception for this that we can check down below to rethrow
                    if (!process.env.REACT_APP_EVENTS_URL) throw new Error("Events url is not defined");
                    const token = (getState() as unknown as RootState).persistedReducer.accessToken as string;

                    await fetchEventSource(process.env.REACT_APP_EVENTS_URL, {
                        onmessage(event) {
                            // TODO: extract and refactor this to be less complex, use if-else / switch statements, and use enums for event names. Also disconnect the event source on cacheEntryRemoved
                            const eventData = JSON.parse(event.data) as Item | SequenceItem[] | StandardItem | number;

                            if (event.event === "item.create") {
                                updateCachedData((draft) => {
                                    draft.push(eventData as Item);
                                });
                            }

                            if (event.event === "item.update") {
                                updateCachedData((draft) => {
                                    const foundItem = draft.find((item) => item.id === (eventData as Item).id);
                                    if (foundItem) {
                                        Object.assign(foundItem, eventData);
                                    } else {
                                        draft.push(eventData as Item);
                                    }
                                });
                            }
                            if (event.event === "item.updateSequences") {
                                updateCachedData((draft) => {
                                    draft.forEach((item: Item) => {
                                        const foundSequenceItem = (eventData as SequenceItem[]).find(
                                            (sequenceItem) => sequenceItem.id === item.id,
                                        );
                                        // eslint-disable-next-line no-param-reassign
                                        if (foundSequenceItem) item.sequence = foundSequenceItem.sequence;
                                    });
                                    draft.sort((a: Item, b: Item) => a.sequence - b.sequence);
                                });
                            }
                            if (event.event === "item.delete") {
                                updateCachedData((draft) => {
                                    const foundIndex = draft.findIndex((item: Item) => item.id === (eventData as number));
                                    if (foundIndex === -1) return;
                                    draft.splice(foundIndex, 1);
                                });
                            }
                            if (event.event === "item.deleteAll") {
                                updateCachedData(() => []);
                            }
                            if (event.event === "item.deleteChecked") {
                                updateCachedData((draft) => draft.filter((item) => item.status === 1));
                            }
                        },
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                        credentials: "include",
                    });
                } catch (e) {
                    // Do nothing for now, in the future add a check if it is a unset variable error and rethrow
                }
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
            async onQueryStarted(_patch, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        shoppingListApi.util.updateQueryData("getAllItems", undefined, (draft) => {
                            draft.push(data);
                        }),
                    );
                } catch {
                    // We don't want to do anything here. Redux takes care of it.
                }
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
                    shoppingListApi.util.updateQueryData("getAllItems", undefined, (draft) => {
                        const foundItem = draft.find((draftItem) => draftItem.id === item.id);
                        if (foundItem) {
                            Object.assign(foundItem, item);
                        }
                    }),
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
                    shoppingListApi.util.updateQueryData("getAllItems", undefined, (draft) => {
                        const itemIndex = draft.findIndex((item) => item.id === id);
                        if (itemIndex === -1) return;
                        draft.splice(itemIndex, 1);
                    }),
                );
                queryFulfilled.catch(patchResult.undo);
            },
        }),
        deleteAllItems: builder.mutation<void, void>({
            query: () => ({
                url: `item/all`,
                method: "DELETE",
            }),
            async onQueryStarted(_patch, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(shoppingListApi.util.updateQueryData("getAllItems", undefined, () => []));
                } catch {
                    // We don't want to do anything here. Redux takes care of it.
                }
            },
        }),
        deleteChecked: builder.mutation<void, void>({
            query: () => ({
                url: `item/checked`,
                method: "DELETE",
            }),
            async onQueryStarted(_patch, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        shoppingListApi.util.updateQueryData("getAllItems", undefined, (draft) => draft.filter((item) => item.status === 1)),
                    );
                } catch {
                    // We don't want to do anything here. Redux takes care of it.
                }
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
                    shoppingListApi.util.updateQueryData("getAllItems", undefined, (draft) => {
                        draft.forEach((item) => {
                            const foundSequenceItem = sequences.find((sequenceItem) => sequenceItem.id === item.id);
                            // eslint-disable-next-line no-param-reassign
                            item.sequence = foundSequenceItem ? foundSequenceItem.sequence : item.sequence;
                        });
                        draft.sort((a: Item, b: Item) => a.sequence - b.sequence);
                    }),
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
                    shoppingListApi.util.updateQueryData("getAllItems", undefined, (draft) => {
                        const foundItem = draft.find((item) => item.id === id);
                        if (!foundItem) return;
                        foundItem.status = 2;
                    }),
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
                    shoppingListApi.util.updateQueryData("getAllItems", undefined, (draft) => {
                        const foundItem = draft.find((item) => item.id === id);
                        if (!foundItem) return;
                        foundItem.status = 1;
                    }),
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
            async onQueryStarted(_patch, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        shoppingListApi.util.updateQueryData("getAllStandardItems", undefined, (draft) => {
                            draft.push(data);
                        }),
                    );
                } catch {
                    // We don't want to do anything here. Redux takes care of it.
                }
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
                    shoppingListApi.util.updateQueryData("getAllStandardItems", undefined, (draft) => {
                        const standardItemIndex = draft.findIndex((standardItem) => standardItem.id === id);
                        if (standardItemIndex === -1) return;
                        draft.splice(standardItemIndex, 1);
                    }),
                );
                queryFulfilled.catch(patchResult.undo);
            },
        }),
        deleteAllStandardItems: builder.mutation<void, void>({
            query: () => ({
                url: `standardItem/all`,
                method: "DELETE",
            }),
            async onQueryStarted(_patch, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(shoppingListApi.util.updateQueryData("getAllStandardItems", undefined, () => []));
                } catch {
                    // We don't want to do anything here. Redux takes care of it.
                }
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
} = shoppingListApi;
