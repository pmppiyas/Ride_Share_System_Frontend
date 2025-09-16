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
      query: ({ id, ...formData }) => ({
        url: `/user/update/${id}`,
        method: "PATCH",
        data: formData,
      }),
      invalidatesTags: ["AUTH"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useLogoutMutation,
  useUpdateProfileMutation,
} = authApi;
