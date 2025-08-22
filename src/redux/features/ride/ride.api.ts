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
    }),
  }),
});

export const { useGetRidesQuery } = rideApi;
