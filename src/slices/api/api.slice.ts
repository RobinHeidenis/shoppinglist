import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Item } from "../../interfaces/item";
import { SearchResultItem } from "../../pages/shoppingList/search";

export const shoppinglistApi = createApi({
    reducerPath: "shoppinglistApi",
    tagTypes: ["items", "standardItems"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/api/v2/",
        prepareHeaders: (headers) => {
            headers.set("Authorization", "Bearer " + localStorage.getItem("authToken"));
            return headers;
        },
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
            providesTags: ["items"],
        }),
        search: builder.query<SearchResultItem[], string>({
            query: (query) => `search/${query}`,
        }),
        getStandardItemById: builder.query<Item, number>({
            query: (id) => `standardItem/${id}`,
        }),
        getAllStandardItems: builder.query<Item[], void>({
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
                            return (draft = []);
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
} = shoppinglistApi;
