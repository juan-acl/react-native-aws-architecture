import {configureStore, Action, ThunkAction} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {hotelsApi} from "./api/hotel.api";
import rootReducer from "./reducers/root.reducer";

export const store = configureStore({
    reducer: {
        [hotelsApi.reducerPath]: hotelsApi.reducer,
        reducer: rootReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(hotelsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

setupListeners(store.dispatch);
