import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL_API } from "@/src/constants";
import { setIsLoading } from "@/src/redux/slices/loader.slice";
import { HOTELS_API } from "@/src/redux/nameApis";
import { setHotels } from "@/src/redux/slices/hotel.slice";

interface Hotel {
  email: string;
  name: string;
  address: string;
  phone: string;
  image: string;
}

export const hotelsApi = createApi({
  reducerPath: HOTELS_API,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_API }),
  endpoints: (builder) => ({
    fetchHotels: builder.query({
      query: () => ({
        url: "/hotels/getHotels",
        method: "POST",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setIsLoading({ isLoading: true }));
          dispatch(setHotels({ hotels: data.hotels }));
        } finally {
          dispatch(setIsLoading({ isLoading: false }));
        }
      },
    }),
    createHotel: builder.query({
      query: (body: Hotel) => ({
        url: "/hotels/createHotel",
        method: "POST",
        body,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setIsLoading({ isLoading: true }));
          await queryFulfilled;
        } catch (error) {
          console.log("error in create hotrel" + error);
        } finally {
          dispatch(setIsLoading({ isLoading: false }));
        }
      },
    }),
  }),
});

export const { useFetchHotelsQuery } = hotelsApi;
