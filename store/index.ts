import { configureStore } from "@reduxjs/toolkit";
import featuredHolidaysReducer from "./slices/featuredHolidays";
import testimonialReducer from "./slices/testimonials";
import popularAttractionsReducer from "./slices/popularAttractions";
import attractionsDetailsReducer from "./slices/attractionsDetails";
import featuredHolidaysDetailsReducer from "./slices/featuredHolidaysDetails"

export const store = configureStore({
  reducer: {
    featuredHolidays: featuredHolidaysReducer,
    testimonials: testimonialReducer,
    popularAttractions: popularAttractionsReducer,
    attractionsDetails: attractionsDetailsReducer,
    featuresHolidaysDetails: featuredHolidaysDetailsReducer,
  },
});

// ✅ Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
