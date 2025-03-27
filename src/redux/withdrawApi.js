import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";

export const withdrawApi = createApi({
  reducerPath: "withdrawApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/v1`,

    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["withdraw"],
  endpoints: (builder) => ({
    withdrawRequest: builder.mutation({
      query: (personData) => ({
        url: "/withdraw-request",
        method: "POST",
        body: personData,
      }),
    }),

    getAllRequests: builder.query({
      query: () => ({
        url: "/get-all-requests",
        method: "GET",
      }),
    }),

    updateWithdrawStatus: builder.mutation({
      query: ({ withdrawId, status }) => ({
        url: `/update-withdraw-status/${withdrawId}`,
        method: "PUT",
        body: { status },
      }),
    }),

  }),
});

export const {
  useWithdrawRequestMutation,
  useGetAllRequestsQuery,
  useUpdateWithdrawStatusMutation,
} = withdrawApi;
