import { combineReducers } from "@reduxjs/toolkit";
import { hotelReducer } from "../slices/hotel.slice";

const rootReducer = combineReducers({
    hotels: hotelReducer
})

export default rootReducer;