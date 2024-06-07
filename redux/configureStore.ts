import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { hotelsApi } from "./api/hotel.api";
import rootReducer from "./reducers/root.reducer";

export const store = configureStore({
    reducer: {
        [hotelsApi.reducerPath]: hotelsApi.reducer,
        rootReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(hotelsApi.middleware),
})

setupListeners(store.dispatch);