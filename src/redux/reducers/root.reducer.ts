import { combineReducers } from "@reduxjs/toolkit";
import { hotelReducer } from "../slices/hotel.slice";
import { loaderReducer } from "../slices/loader.slice";
import { authReducer } from "../slices/auth.slice";

const rootReducer = combineReducers({
  hotels: hotelReducer,
  loader: loaderReducer,
  auth: authReducer,
});

export default rootReducer;
