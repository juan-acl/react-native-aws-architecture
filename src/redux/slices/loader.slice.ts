import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loader_slice} from "@/src/redux/nameSlices";

interface LoaderState {
    isLoading: boolean
}

const initialState: LoaderState = {
    isLoading: true
}

const loaderSlice = createSlice({
    name: loader_slice,
    initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<{ isLoading: boolean }>) {
            state.isLoading = action.payload.isLoading;
        }
    }
})

export const {setIsLoading} = loaderSlice.actions;
export const loaderReducer = loaderSlice.reducer;