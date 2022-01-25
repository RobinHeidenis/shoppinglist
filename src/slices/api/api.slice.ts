import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Item } from "../../interfaces/item";

export const shoppinglistApi = createApi({
    reducerPath: "shoppinglistApi",
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
        }),
    }),
});

export const { useGetItemByIdQuery, useGetAllItemsQuery } = shoppinglistApi;
