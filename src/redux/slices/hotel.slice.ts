import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HOTEL_SLICE} from "@/src/redux/nameSlices";

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
}

const initialState: HotelState = {
    hotels: []
}

const hotelSlice = createSlice({
    name: HOTEL_SLICE,
    initialState,
    reducers: {
        setHotels(state, action: PayloadAction<{ hotels: Hotel[] }>) {
            state.hotels = action.payload.hotels;
        }
    }
})

export const {setHotels} = hotelSlice.actions;
const hotelReducer = hotelSlice.reducer;
export {hotelReducer}