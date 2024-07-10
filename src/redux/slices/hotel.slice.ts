import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HOTEL_SLICE } from "@/src/redux/nameSlices";
import { HotelState, Hotel } from "@/src/types/hotel";

const initialState: HotelState = {
  hotels: [],
  filterText: "",
  currentHotel: null,
};

const hotelSlice = createSlice({
  name: HOTEL_SLICE,
  initialState,
  reducers: {
    setHotels(state, action: PayloadAction<{ hotels: Hotel[] }>) {
      state.hotels = action.payload.hotels;
    },
    setHotelInformationBottomSheet(state, action: PayloadAction<Hotel>) {
      state.currentHotel = action.payload;
    },
    setCleanCurrentHotel(state, _) {
      state.currentHotel = null;
    },
    setFilterText(state, action: PayloadAction<{ filterText: string }>) {
      state.filterText = action.payload.filterText;
    },
  },
});

export const {
  setHotels,
  setFilterText,
  setHotelInformationBottomSheet,
  setCleanCurrentHotel,
} = hotelSlice.actions;
export const hotelReducer = hotelSlice.reducer;
