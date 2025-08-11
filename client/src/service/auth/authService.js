import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";


export const authApi = createApi({
    reducerPath:'authApi',
    baseQuery: baseQuery,
    endpoints: (builder)=> ({
        register: builder.mutation({
            query: (data)=>({
                url: "/auth/register",
                method: "POST",
                body: data
            })
        }),
        login: builder.mutation({
            query: (data)=>({
                url: "/auth/login",
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query: ()=>({
            url: "/auth/logout",
            method: "POST"
        })
        }),
        refreshToken: builder.mutation({
            query: ()=>({
                url: "/auth/refresh",
                method: "POST"
            })
        })
    })
})

export const {useRegisterMutation, useLoginMutation, useLogoutMutation, useRefreshTokenMutation} = authApi;