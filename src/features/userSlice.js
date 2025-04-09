import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info: {
        id: null, 
        // email: '',
        // name: '',
        // surname: '',
    },
    token: null,
    isCompleted: null,
    // loading: false,
}

// {...info, ...payload}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setIsCompleted: (state, action) => {
            state.isCompleted = action.payload;
        },
        // action.payload -> {id: ..., email: ...}
        updateUserInfo: (state, action) => {            
            state.info = { ...state.info, ...action.payload}
        },
    }
})

export const { setToken, setIsCompleted, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;