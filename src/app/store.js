import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    loginuserdata : userSlice,
})