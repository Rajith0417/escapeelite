import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface FeaturedHoliday {
  id: number
  category_name: string
  category_slug: string
  country_name: string
  image: string
  country_slug: string
}

export const fetchFeaturedHolidays = createAsyncThunk(
  "featuredHolidays/fetch",
  async () => {
    const res = await fetch("https://www.localhost/projects/escapeelite.com/api/featured-holidays.php");
    const data = await res.json();
    // assuming your PHP API returns { success: true, data: [...] }
    return data.data;
  }
);

interface FeaturedHolidaysState {
  data: FeaturedHoliday[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FeaturedHolidaysState = {
  data: [],
  status: "idle",
  error: null,
};

const featuredHolidaysSlice = createSlice({
  name: "featuredHolidays",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedHolidays.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeaturedHolidays.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchFeaturedHolidays.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default featuredHolidaysSlice.reducer;
