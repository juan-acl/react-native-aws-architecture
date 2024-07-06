import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BOTTOM_SHEET_SLICE} from "../nameSlices";

interface InitialState {
    visibleBottomSheet: boolean
}

const initialState: InitialState = {
    visibleBottomSheet: false,
}

export const navSlice = createSlice({
    name: BOTTOM_SHEET_SLICE,
    initialState,
    reducers: {
        setVisibleBottomSheet: (state: InitialState, action: PayloadAction<{ visibleBottomSheet: boolean }>) => {
            state.visibleBottomSheet = action.payload.visibleBottomSheet;
        }
    }
})

export const {setVisibleBottomSheet} = navSlice.actions
export const bottomSheetReducer = navSlice.reducer