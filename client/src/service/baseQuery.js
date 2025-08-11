import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const query = fetchBaseQuery({
  baseUrl: "/api",
  credentials: "include",
});

export const baseQuery = async (args, api, extraOptions) => {
  let result = await query(args, api, extraOptions);

  if (result?.error && result.error.status === 401) {
    const refreshResult = await query(
      {
        url: "/auth/refresh",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      result = await query(args, api, extraOptions);
    } else {
      //logout and clear state
    }
  }

  return result;
};
