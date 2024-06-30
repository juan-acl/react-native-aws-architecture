import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL_API } from "@/src/constants";
import { setIsLoading } from "@/src/redux/slices/loader.slice";
import { HOTELS_API } from "@/src/redux/nameApis";

interface Hotel {
    id: number;
    active: boolean;
    updateAt: number;
    createAt: number;
    name: string;
    address: string;
    phone: string;
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
                    dispatch(setIsLoading({ isLoading: true }))
                    await queryFulfilled;
                } finally {
                    dispatch(setIsLoading({ isLoading: false }))
                }
            }
        })
    })
})

export const { useFetchHotelsQuery } = hotelsApi;