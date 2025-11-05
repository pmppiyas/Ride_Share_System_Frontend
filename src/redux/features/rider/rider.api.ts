import { baseApi } from "@/redux/baseApi";

export const riderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    findDriver: builder.mutation({
      query: (payload) => ({
        url: "/ride/find_driver",
        method: "POST",
        data: payload,
      }),
    }),

    getMyRideHistory: builder.query({
      query: () => ({
        url: "/user/meta",
        method: "GET",
      }),
      transformResponse: (data) => data.data,
    }),
  }),
});

export const { useFindDriverMutation, useGetMyRideHistoryQuery } = riderApi;
