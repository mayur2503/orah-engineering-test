import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "features/students/studentSlice";

export const store = configureStore({
    reducer: {
        student: studentSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch