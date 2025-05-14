import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const basequary = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API_URL,
  prepareHeaders: async (headers) => {
    const auth = localStorage.getItem("auth");
    const user = auth ? JSON.parse(auth) : null;
    const token = user?.token;
    headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "REST_API",
  baseQuery: async (args, api, extraOption) => {
    const result = await basequary(args, api, extraOption);
    return result;
  },
  tagTypes: ["update", "business", "category"],
  endpoints: () => ({}),
});
