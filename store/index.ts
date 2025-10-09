import { configureStore } from "@reduxjs/toolkit";
// import featuredPackagesReducer from "./slices/featuredPackagesSlice";
import featuredHolidaysReducer from "./slices/featuredHolidays";
import testimonialReducer from "./slices/testimonials";

export const store = configureStore({
  reducer: {
    // featuredPackages: featuredPackagesReducer,
    featuredHolidays: featuredHolidaysReducer,
    testimonials: testimonialReducer,
  },
});

// ✅ Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
