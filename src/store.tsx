import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./redex/admin";
import courseSlice from "./redex/allStudents";

export const store = configureStore({
  reducer: {
    adminDetails: adminSlice,
    courseDetails: courseSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
