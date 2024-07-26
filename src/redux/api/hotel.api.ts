import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL_API } from "@/src/constants";
import { setIsLoading } from "@/src/redux/slices/loader.slice";
import { HOTELS_API } from "@/src/redux/nameApis";

const CURRENT_PATH = "/hotels/";

interface Hotel {
  idHotel: string;
  email: string;
  name: string;
  address: string;
  phone: string;
  image: string;
}

interface HotelFavorite {
  idHotel: string;
  idUser: string;
}

export const hotelsApi = createApi({
  reducerPath: HOTELS_API,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_API + CURRENT_PATH }),
  endpoints: (builder) => ({
    removeFromHotelFavorite: builder.query({
      query: ({ idHotel, idUser }: HotelFavorite) => ({
        url: "removeHotelFavoriteByUser",
        method: "POST",
        body: { idHotel, idUser },
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.log("error in get hotel favorite" + JSON.stringify(error));
        }
      },
    }),
    getIsHotelFavoriteByUser: builder.query({
      query: ({ idHotel, idUser }: HotelFavorite) => ({
        url: "getIsFavoriteHotelByUser",
        method: "POST",
        body: { idHotel, idUser },
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.log("error in get hotel favorite" + JSON.stringify(error));
        }
      },
    }),
    addToHotelFavorite: builder.query({
      query: ({ idHotel, idUser }: HotelFavorite) => ({
        url: "addHotelFavoriteByUser",
        method: "POST",
        body: { idHotel, idUser },
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.log("error in add hotel to favorite" + JSON.stringify(error));
        }
      },
    }),
    fetchHotels: builder.query({
      query: () => ({
        url: "getHotels",
        method: "POST",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setIsLoading({ isLoading: true }));
          await queryFulfilled;
        } finally {
          dispatch(setIsLoading({ isLoading: false }));
        }
      },
    }),
    createHotel: builder.query({
      query: (body: Hotel) => ({
        url: "createHotel",
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
