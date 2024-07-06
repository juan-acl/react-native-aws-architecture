import {combineReducers} from "@reduxjs/toolkit";
import {hotelReducer} from "../slices/hotel.slice";
import {loaderReducer} from "../slices/loader.slice";
import {authReducer} from "../slices/auth.slice";
import {bottomSheetReducer} from "../slices/bottomSheet.slice";

const rootReducer = combineReducers({
    hotels: hotelReducer,
    loader: loaderReducer,
    auth: authReducer,
    bottomSheet: bottomSheetReducer
})

export default rootReducer;