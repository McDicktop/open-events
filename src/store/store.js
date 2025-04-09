import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/userSlice'
import eventsSlice from '../features/eventsSlice'
import appSlice from '../features/appSlice'


export const store = configureStore({
    reducer: {
        user: userSlice,
        events: eventsSlice,
        app: appSlice,
    },
})