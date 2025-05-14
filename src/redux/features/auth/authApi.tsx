import { apiSlice } from "../../app/api";
import { loggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "/api/auth/",
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    getOneUser: builder.query({
      query: (id) => ({
        url: `/api/auth/${id}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    register: builder.mutation({
      query: (user) => ({
        url: "/api/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    createPayment: builder.mutation({
      query: ({ business, id }) => ({
        url: `/api/payment/create/${id}`,
        method: "POST",
        body: business,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/api/auth/login",
        method: "POST",
        body: user,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              token: result.data.token,
              user: result.data.user,
            })
          );
          dispatch(
            loggedIn({
              token: result.data.token,
              user: result.data.user,
            })
          );
        } catch (error) {
          // Do Nothning
          console.error(error);
        }
      },
    }),
    resetPassword: builder.mutation({
      query: (user) => ({
        url: "/api/auth/reset",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["update"],
    }),
    updatePassword: builder.mutation({
      query: ({ user, id }) => ({
        url: `/api/auth/password/${id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["update"],
    }),
    updateUser: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/api/auth/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["update"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/auth/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["update"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useLoginMutation,
  useDeleteUserMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useGetOneUserQuery,
  useCreatePaymentMutation,
} = authApi;
