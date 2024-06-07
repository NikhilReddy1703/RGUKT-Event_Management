// frontend/src/store.js
import { configureStore } from '@reduxjs/toolkit';
import student_reducer from "./redux/studentSlice"
export const store = configureStore({
    reducer:student_reducer,
});