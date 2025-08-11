import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getMessages: builder.query({
        query: (userId)=>({
            url: `/messages/${userId}`,
            method: 'GET'
        })
    }),
  }),
});

export const {useGetMessagesQuery} = messageApi;