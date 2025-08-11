import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQuery,
    endpoints: (builder)=>({
        getMyProfile: builder.query({
            query: ()=>({
                url: "/users/me",
                method: "GET"
            })
        }),
        getMyFriends: builder.query({
            query: ()=>({
                url: "/friends/my",
                method: "GET"
            })
        }),
        getAllUsers: builder.query({
            query: ({page, limit})=>({
                url: `/users/all/?limit=${limit}&page=${page}`,
                method: 'GET'
            })
        })
    })
})

export const {useGetMyProfileQuery, useGetMyFriendsQuery, useGetAllUsersQuery} = userApi;