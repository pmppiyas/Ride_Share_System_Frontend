import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    driverRegister: builder.mutation({
      query: (userInfo) => ({
        url: "/driver/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    getDriverRequest: builder.query({
      query: () => ({
        url: "/driver/all-driver-request",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
    }),
    driverReqHandle: builder.mutation({
      query: ({ id, status }) => ({
        url: `/driver/handle-request/${id}`,
        method: "POST",
        data: status,
      }),
    }),
    getDrivers: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `/driver?${queryString}`,
          method: "GET",
        };
      },
      transformResponse: (res) => res.data,
    }),

    getEarnings: builder.query({
      query: () => ({
        url: "/driver/earnings",
        method: "GET",
      }),
    }),
    getRideHistory: builder.query({
      query: () => ({
        url: "/driver/ride-history",
        method: "GET",
      }),
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
