import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalProfile: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        modalProfileHandler: (state, action) => {
            state.modalProfile = action.payload
        },
    }
})

export const { modalProfileHandler } = appSlice.actions;
export default appSlice.reducer;