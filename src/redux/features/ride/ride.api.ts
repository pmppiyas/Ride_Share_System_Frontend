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
      query: () => ({
        url: "/ride/my-rides",
        method: "GET",
      }),
      transformResponse: (res) => {
        return {
          ...res.data,
          rides: [...res.data.rides].reverse(),
        };
      },
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

    toggleStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/ride/set-status/${id}/${status}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["RIDE"],
    }),

    getMyDrives: builder.query({
      query: () => ({
        url: "ride/my-drives",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: ["RIDE"],
    }),
  }),
});

export const {
  useGetRidesQuery,
  useGetMyRidesQuery,
  useRideRequestMutation,
  useGetMyDrivesQuery,
  useToggleStatusMutation,
} = rideApi;
