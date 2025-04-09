import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    currentEvent: null,
}

// {...info, ...payload}

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        updateEvents: (state, action) => {
            state.data = [...action.payload]
        },
        getEvent: (state, action) => {
            state.currentEvent = state.data.find((event) => event._id === action.payload);
        },
    }
})

export const { updateEvents, getEvent } = eventsSlice.actions;
export default eventsSlice.reducer;