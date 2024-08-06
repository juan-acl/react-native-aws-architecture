import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL_API } from "@/src/constants";
import { setIsLoading } from "@/src/redux/slices/loader.slice";
import { HOTELS_API } from "@/src/redux/nameApis";
import { Create_Hotel, HotelFavorite } from "@/src/types/hotel";

const CURRENT_PATH = "/hotels/";

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
          throw new Error("error in removeHotelFavoriteByUser" + error);
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
          throw new Error("error in getIsHotelFavoriteByUser" + error);
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
          throw new Error("error on addToHotelFavorite" + error);
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
      query: (body: Create_Hotel) => ({
        url: "createHotel",
        method: "POST",
        body,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setIsLoading({ isLoading: true }));
          await queryFulfilled;
        } catch (error) {
          throw new Error("error on create hotel" + error);
        } finally {
          dispatch(setIsLoading({ isLoading: false }));
        }
      },
    }),
  }),
});

export const { useFetchHotelsQuery } = hotelsApi;
