import { Hotel } from "@/src/redux/slices/hotel.slice";

export interface FetchHotelsQuery {
    data: fetchHotel;
    error: string;
    isLoading: boolean;
}

interface fetchHotel {
    code: number;
    count: number;
    hotels: Hotel[];
}

export interface HotelMap {
    [key: string]: any;
}