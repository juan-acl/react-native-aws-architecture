import {combineReducers} from "@reduxjs/toolkit";
import {hotelReducer} from "../slices/hotel.slice";
import {loaderReducer} from "../slices/loader.slice";

const rootReducer = combineReducers({
    hotels: hotelReducer,
    loader: loaderReducer
})

export default rootReducer;