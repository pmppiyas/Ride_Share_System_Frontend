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
  }),
});

export const { useFindDriverMutation } = riderApi;
