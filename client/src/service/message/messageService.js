import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    // Use infiniteQuery instead of regular query
    getMessages: builder.infiniteQuery({
      infiniteQueryOptions: {
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams, queryArg) => {
          // If last page has fewer items than limit, no more pages
          if (lastPage.length < queryArg.limit) {
            return undefined;
          }
          return lastPageParam + 1;
        },
      },
      // Query receives {queryArg, pageParam}
      query: ({ queryArg, pageParam }) => ({
        url: `/messages/${queryArg.userId}/?page=${pageParam}&limit=${queryArg.limit}`,
        method: 'GET'
      }),
      transformResponse: (response) => {
        return Array.isArray(response) ? response : response?.data || [];
      }
    }),
  }),
});

export const { useGetMessagesInfiniteQuery } = messageApi;