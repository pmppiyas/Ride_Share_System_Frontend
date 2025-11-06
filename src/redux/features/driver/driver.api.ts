/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { Ride } from "@/types";

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
      providesTags: ["DRIVER", "RIDE"],
      transformResponse: (res) => res.data,
    }),
    driverReqHandle: builder.mutation({
      query: ({ id, status }) => ({
        url: `/driver/request-handle/${id}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["DRIVER", "RIDE"],
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
      providesTags: ["DRIVER", "RIDE"],
      transformResponse: (res) => res.data,
    }),

    getMyDrives: builder.query<Ride[], null>({
      query: () => ({
        url: "/ride/my-drives",
        method: "GET",
      }),
      providesTags: ["DRIVER", "RIDE"],
      transformResponse: (res: any) => res.data.rides,
    }),

    setRideStatus: builder.mutation({
      query: ({ id, action }) => ({
        url: `/ride/set-status/${id}`,
        method: "PATCH",
        data: { status: action },
      }),
      invalidatesTags: ["RIDE", "DRIVER"],
    }),

    activeStatus: builder.mutation({
      query: ({ status }: { status: boolean }) => ({
        url: `/driver/active_status/${status}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["DRIVER"],
    }),
    suspendDriver: builder.mutation<
      { message: string },
      { id: string; status: "ACTIVE" | "BLOCK" }
    >({
      query: ({ id, status }) => ({
        url: `/user/suspend/${id}/${status}`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER"],
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
  useGetMyDrivesQuery,
  useSetRideStatusMutation,
  useActiveStatusMutation,
  useSuspendDriverMutation,
} = authApi;
