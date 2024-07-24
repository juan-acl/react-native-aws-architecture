import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HOTEL_SLICE } from "@/src/redux/nameSlices";
import { HotelState, Hotel } from "@/src/types/hotel";
import { AsyncThunkTypes, CreateHotelParams } from "@/src/types/hotel";
import { hotelsApi } from "../api/hotel.api";

const initialState: HotelState = {
  hotels: [],
  filterText: "",
  headerShow: true,
  currentHotel: null,
  currentScreenTabNavigation: "",
  showModalHotel: false,
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
      action: PayloadAction<{ currentScreenTabNavigation: string }>
    ) {
      state.currentScreenTabNavigation =
        action.payload.currentScreenTabNavigation;
    },
    setShowModalHotel(
      state,
      action: PayloadAction<{ showModalHotel: boolean }>
    ) {
      state.showModalHotel = action.payload.showModalHotel;
    },
    setFilterText(state, action: PayloadAction<{ filterText: string }>) {
      state.filterText = action.payload.filterText;
    },
  },
});

export const getHotelsApp = createAsyncThunk(
  AsyncThunkTypes.GET_HOTELS,
  async (_, thunkAPI) => {
    try {
      await thunkAPI.dispatch(hotelsApi.endpoints.fetchHotels.initiate({}));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createHotel = createAsyncThunk(
  AsyncThunkTypes.CREATE_HOTEL,
  async (
    { name, address, email, phone, image }: CreateHotelParams,
    thunkAPI
  ) => {
    try {
      await thunkAPI.dispatch(
        hotelsApi.endpoints.createHotel.initiate({
          name,
          address,
          email,
          phone,
          image,
        })
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const setCleanCurrentHotel = createAsyncThunk(
  AsyncThunkTypes.CREAN_CURRENT_HOTEL,
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setHeaderShow({ show: true }));
    thunkAPI.dispatch(hotelSlice.actions.setCleanCurrentHotel(null));
  }
);

export const {
  setHotels,
  setFilterText,
  setHotelInformationBottomSheet,
  setHeaderShow,
  setCurrentTabNavigation,
  setShowModalHotel,
} = hotelSlice.actions;
export const hotelReducer = hotelSlice.reducer;
