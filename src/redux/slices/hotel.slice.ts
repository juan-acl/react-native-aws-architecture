import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HOTEL_SLICE } from "@/src/redux/nameSlices";
import { HotelState, Hotel } from "@/src/types/hotel";
import { AsyncThunkTypes } from "@/src/types/hotel";

const initialState: HotelState = {
  hotels: [],
  filterText: "",
  headerShow: true,
  currentHotel: null,
  currentScreenTabNavigation: "",
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
    setHeaderShow(state, action: PayloadAction<{ show: boolean }>) {
      state.headerShow = action.payload.show;
    },
    setCurrentTabNavigation(
      state,
      action: PayloadAction<{ currentScreenTabNavigation: string }>,
    ) {
      state.currentScreenTabNavigation =
        action.payload.currentScreenTabNavigation;
    },
    setFilterText(state, action: PayloadAction<{ filterText: string }>) {
      state.filterText = action.payload.filterText;
    },
  },
});

export const setCleanCurrentHotel = createAsyncThunk(
  AsyncThunkTypes.CREAN_CURRENT_HOTEL,
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setHeaderShow({ show: true }));
    thunkAPI.dispatch(hotelSlice.actions.setCleanCurrentHotel(null));
  },
);

export const {
  setHotels,
  setFilterText,
  setHotelInformationBottomSheet,
  setHeaderShow,
  setCurrentTabNavigation,
} = hotelSlice.actions;
export const hotelReducer = hotelSlice.reducer;
