import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["AUTH"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["AUTH"],
    }),
    getMe: builder.query({
      query: () => ({
        url: "/auth/getme",
        method: "GET",
      }),
      providesTags: ["AUTH"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["AUTH"],
    }),
    updateProfile: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/user/update/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["AUTH"],
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        data: data,
      }),
    }),

    metadata: builder.query({
      query: () => ({
        url: "/user/meta",
        method: "GET",
      }),
      transformResponse: (data) => data.data,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useLogoutMutation,
  useUpdateProfileMutation,
  useResetPasswordMutation,
  useMetadataQuery,
} = authApi;
