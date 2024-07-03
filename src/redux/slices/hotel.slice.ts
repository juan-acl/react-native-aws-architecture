import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HOTEL_SLICE } from "@/src/redux/nameSlices";

export interface Hotel {
    id: number;
    name: string;
    address: string;
    createAt: string;
    updateAt: string;
    phone: string;
    active: boolean;
}

interface HotelState {
    hotels: Hotel[];
    filterText: string;
    currentHotel: Hotel | null;
}

const initialState: HotelState = {
    hotels: [],
    filterText: "",
    currentHotel: null,
}

const hotelSlice = createSlice({
    name: HOTEL_SLICE,
    initialState,
    reducers: {
        setHotels(state, action: PayloadAction<{ hotels: Hotel[] }>) {
            state.hotels = action.payload.hotels;
        },
        setFilterText(state, action: PayloadAction<{ filterText: string }>) {
            state.filterText = action.payload.filterText;
        }
    }
})

export const { setHotels, setFilterText } = hotelSlice.actions;
export const hotelReducer = hotelSlice.reducer;