import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";
export const userApi = createApi({
  reducerPath: "userApi",
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
  tagTypes: ["profile"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (personData) => ({
        url: "/signup",
        method: "POST",
        body: personData,
      }),
    }),
    verifyUser: builder.mutation({
      query: ({ otp, email }) => ({
        url: "/verify-user",
        method: "POST",
        body: { otp, email },
      }),
    }),
    login: builder.mutation({
      query: (loginData) => ({
        url: "/login",
        method: "POST",
        body: loginData,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    getPoints: builder.query({
      query: () => ({
        url: "/points",
        method: "GET",
      }),
    }),
    updatePassword: builder.mutation({
      query: (updatePassword) => ({
        url: "/updatePass",
        method: "PUT",
        body: updatePassword,
      }),
    }),
    getRefferalUsers: builder.query({
      query: (referralCode) => ({
        url: `/getRef?referralCode=${referralCode}`,
        method: "GET",
      }),
    }),
    sendFeedback: builder.mutation({
      query: (content) => ({
        url: "/feedback",
        method: "POST",
        body: content,
      }),
    }),
    changeBepCoin: builder.mutation({
      query: (id) => ({
        url: `/convert-points/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["profile"],
    }),
    changeExtraBepCoin: builder.mutation({
      query: (id) => ({
        url: `/refConvert-points/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["profile"],
    }),

    forgotpasswordotp: builder.mutation({
      query: (email) => ({
        url: "/forgot-password-otp",
        method: "POST",
        body: { email },
      }),
    }),

    verifyOTP: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/verify-otp",
        method: "POST",
        body: { email, otp },
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ email, password }) => ({
        url: "/reset-password",
        method: "PUT",
        body: { email, password },
      }),
    }),

    uploadPaymentImage: builder.mutation({
      query: (formData) => ({
        url: "/upload-payment-image",
        method: "PUT",
        body: formData,
      }),
    }),

    updateEligibilityCriteria: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/update-eligibility-criteria/${userId}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["profile"],
    }),

    updateUserRole: builder.mutation({
      query: ({ userId, role  }) => ({
        url: `/update-user-role/${userId}`,
        method: "PUT",
        body: { role  },
      }),
      invalidatesTags: ["profile"],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetProfileQuery,
  useLogoutMutation,
  useUpdatePasswordMutation,
  useLazyGetPointsQuery,
  useGetRefferalUsersQuery,
  useSendFeedbackMutation,
  useChangeBepCoinMutation,
  useChangeExtraBepCoinMutation,
  useVerifyUserMutation,
  useForgotpasswordotpMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
  useUploadPaymentImageMutation,
  useUpdateEligibilityCriteriaMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation
} = userApi;
