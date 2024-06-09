import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL_API } from "@/src/constants";

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
    reducerPath: "hotelsApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_API }),
    endpoints: (builder) => ({
        fetchHotels: builder.query({
            query: () => ({
                url: "/hotels/getHotels",
                method: "POST",
            })
        })
    })
})

export const { useFetchHotelsQuery } = hotelsApi;