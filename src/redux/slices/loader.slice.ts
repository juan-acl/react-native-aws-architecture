import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOADER_SLICE } from "@/src/redux/nameSlices";

interface LoaderState {
  isLoading: boolean;
}

const initialState: LoaderState = {
  isLoading: false,
};

const loaderSlice = createSlice({
  name: LOADER_SLICE,
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<{ isLoading: boolean }>) {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { setIsLoading } = loaderSlice.actions;
export const loaderReducer = loaderSlice.reducer;
