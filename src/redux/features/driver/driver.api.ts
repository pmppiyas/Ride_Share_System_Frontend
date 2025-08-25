import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    driverRegister: builder.mutation({
      query: (userInfo) => ({
        url: "/driver/register",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["DRIVER", "AUTH"],
    }),
    getDriverRequest: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `/driver/all-driver-request?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["DRIVER"],
      transformResponse: (res) => res.data,
    }),
    driverReqHandle: builder.mutation({
      query: ({ id, status }) => ({
        url: `/driver/request-handle/${id}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["DRIVER"],
    }),

    getDrivers: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `/driver?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["DRIVER"],
      transformResponse: (res) => res.data,
    }),

    getEarnings: builder.query({
      query: () => ({
        url: "/driver/earnings",
        method: "GET",
      }),
      providesTags: ["DRIVER"],
    }),

    getRideHistory: builder.query({
      query: () => ({
        url: "/driver/ride-history",
        method: "GET",
      }),
      providesTags: ["DRIVER"],
      transformResponse: (res) => res.data,
    }),
  }),
});

export const {
  useDriverRegisterMutation,
  useGetDriverRequestQuery,
  useDriverReqHandleMutation,
  useGetDriversQuery,
  useGetEarningsQuery,
  useGetRideHistoryQuery,
} = authApi;
