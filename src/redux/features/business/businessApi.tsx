import { apiSlice } from "../../app/api";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBusinessByUserId: builder.query({
      query: ({ userId, limit, page, sort }) => ({
        url: `/api/business?userId=${userId}&page=${page}&limit=${limit}&sort=${sort}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getAllBusinessDefaultByUserId: builder.query({
      query: (userId) => ({
        url: `/api/business/deafult/${userId}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getOneBusiness: builder.query({
      query: (id) => ({
        url: `/api/business/${id}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    getOneBusinessByList: builder.query({
      query: (id) => ({
        url: `/api/business/by/list/${id}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getOneBusinessResult: builder.query({
      query: (id) => ({
        url: `/api/business/businessResult/${id}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getOneCashflow: builder.query({
      query: (id) => ({
        url: `/api/business/cashflow/${id}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getOnePermonth: builder.query({
      query: (id) => ({
        url: `/api/business/permonth/${id}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getCashflowPermonth: builder.query({
      query: (id) => ({
        url: `/api/business/cashflow/permonth/${id}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getBudgetCalculation: builder.mutation({
      query: (detail) => ({
        url: "/api/business/budget",
        method: "POST",
        body: detail,
      }),
      invalidatesTags: ["category"],
    }),
    getCashflowCalculation: builder.mutation({
      query: (detail) => ({
        url: "/api/business/cashflow",
        method: "POST",
        body: detail,
      }),
      invalidatesTags: ["category"],
    }),
    createBusiness: builder.mutation({
      query: (business) => ({
        url: "/api/business",
        method: "POST",
        body: business,
      }),
      invalidatesTags: ["business"],
    }),
    createCategory: builder.mutation({
      query: (category) => ({
        url: "/api/business/category",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["category"],
    }),

    resetPassword: builder.mutation({
      query: (user) => ({
        url: "/api/auth/reset",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["business"],
    }),
    updateCategory: builder.mutation({
      query: ({ category, id }) => ({
        url: `/api/business/category/permonth/${id}`,
        method: "PATCH",
        body: category,
      }),
      invalidatesTags: ["category"],
    }),
    updateCategoryPermonth: builder.mutation({
      query: ({ category, id }) => ({
        url: `/api/business/update/permonth/${id}`,
        method: "PATCH",
        body: category,
      }),
      invalidatesTags: ["category"],
    }),
    updateCashflowPermonth: builder.mutation({
      query: ({ category, id }) => ({
        url: `/api/business/cashflow/permonth/${id}`,
        method: "PATCH",
        body: category,
      }),
      invalidatesTags: ["category"],
    }),
    updateDepreciationProj: builder.mutation({
      query: ({ category, id }) => ({
        url: `/api/business/update/projection/${id}`,
        method: "PATCH",
        body: category,
      }),
      invalidatesTags: ["category"],
    }),
    updateCashflowPercent: builder.mutation({
      query: ({ category, id }) => ({
        url: `/api/business/cashflow/percent/${id}`,
        method: "PATCH",
        body: category,
      }),
      invalidatesTags: ["category"],
    }),
    updateBusiness: builder.mutation({
      query: ({ business, id }) => ({
        url: `/api/business/${id}`,
        method: "PATCH",
        body: business,
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/business/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
    deleteBusiness: builder.mutation({
      query: (id) => ({
        url: `/api/business/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllBusinessByUserIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateBusinessMutation,
  useCreateCategoryMutation,
  useResetPasswordMutation,
  useGetOneBusinessQuery,
  useGetBudgetCalculationMutation,
  useGetCashflowCalculationMutation,
  useUpdateBusinessMutation,
  useGetOnePermonthQuery,
  useUpdateCategoryPermonthMutation,
  useGetCashflowPermonthQuery,
  useUpdateCashflowPermonthMutation,
  useUpdateCashflowPercentMutation,
  useGetOneCashflowQuery,
  useGetOneBusinessResultQuery,
  useUpdateDepreciationProjMutation,
  useGetOneBusinessByListQuery,
  useDeleteBusinessMutation,
  useGetAllBusinessDefaultByUserIdQuery,
} = authApi;
