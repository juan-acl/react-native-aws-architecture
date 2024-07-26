import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HOTEL_SLICE } from "@/src/redux/nameSlices";
import { HotelState, Hotel } from "@/src/types/hotel";
import {
  AsyncThunkTypes,
  CreateHotelParams,
  ParamsAddHotelToFavorite,
} from "@/src/types/hotel";
import { hotelsApi } from "../api/hotel.api";
import { DialogAlert } from "./dialogAlert.slice";
import { ALERT_TYPE } from "react-native-alert-notification";
import { v4 } from "uuid";

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
  extraReducers: (builder) => {
    builder.addMatcher(
      hotelsApi.endpoints.fetchHotels.matchFulfilled,
      (state, action) => {
        state.hotels = action.payload.hotels;
      }
    );
    builder.addMatcher(
      hotelsApi.endpoints.createHotel.matchFulfilled,
      (state, action) => {
        state.hotels.push(action.payload.newHotel);
      }
    );
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

export const addHotelToFavorite = createAsyncThunk(
  AsyncThunkTypes.ADD_HOTEL_TO_FAVORITE,
  async ({ idHotel, idUser }: ParamsAddHotelToFavorite, thunkAPI) => {
    try {
      console.log("idHotel", idHotel, "idUser", idUser);
      if (!idHotel || !idUser) return;
      thunkAPI.dispatch(
        hotelsApi.endpoints.addToHotelFavorite.initiate({ idHotel, idUser })
      );
      console.log("Hotel added to favorite");
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
          idHotel: v4(),
          name,
          address,
          email,
          phone,
          image,
        })
      );
      thunkAPI.dispatch(
        DialogAlert({
          typeAlert: ALERT_TYPE.SUCCESS,
          title: "Proceso Exitoso",
          message: "El hotel se ha creado con éxito",
          textButton: "Ok",
        })
      );
    } catch (error) {
      thunkAPI.dispatch(
        DialogAlert({
          typeAlert: ALERT_TYPE.DANGER,
          title: "Hubo un error",
          message: "Error al crear el hotel",
          textButton: "Cerrar",
        })
      );
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
  setFilterText,
  setHotelInformationBottomSheet,
  setHeaderShow,
  setCurrentTabNavigation,
  setShowModalHotel,
} = hotelSlice.actions;
export const hotelReducer = hotelSlice.reducer;
