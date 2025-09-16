import { baseApi } from "@/redux/baseApi";

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRides: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `/ride?${queryString}`,
          method: "GET",
        };
      },
      transformResponse: (res) => res.data,
      providesTags: ["RIDE"],
    }),

    getMyRides: builder.query({
      query: () => {
        return {
          url: "/ride/my-rides",
          method: "GET",
        };
      },
      transformResponse: (res) => res.data,
      providesTags: ["RIDE"],
    }),
    rideRequest: builder.mutation({
      query: (data) => ({
        url: `/ride/request/${data.driverId}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["RIDE"],
    }),
    setRideStatus: builder.mutation({
      query: ({ status, id }) => ({
        url: `/ride/set-status/${id}`,
        method: "PUT",
        data: { status },
      }),
      invalidatesTags: ["RIDE"],
    }),
  }),
});

export const {
  useGetRidesQuery,
  useGetMyRidesQuery,
  useRideRequestMutation,
  useSetRideStatusMutation,
} = rideApi;
