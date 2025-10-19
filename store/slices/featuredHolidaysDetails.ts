import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface FeaturedHolidaysDetails {
  id: number
  package_slug: string
  package_name: string
  package_description: string
  price_starting_from: number
  package_category_id: number
  package_order: number
  pkg_category_slug: string
  no_of_nights: number
  no_of_days: number
  image: string
  attractions: string[]
  best_times: string
}

export const fetchFeaturedHolidaysDetails = createAsyncThunk(
  "featuredHolidaysDetails/fetch",
  async (country: string) => {
    console.log("Fetching country:", country);
    console.log(`https://www.localhost/projects/escapeelite.com/api/featured-holidays-details.php?country=${country}`);
    
    const res = await fetch(
      `https://www.localhost/projects/escapeelite.com/api/featured-holidays-details.php?country=${country}`
    );
    const data = await res.json();
    console.log("Fetched data--:", data);
    return data.packages;
  }
);


interface AttractionsState {
  data: FeaturedHolidaysDetails[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AttractionsState = {
  data: null,
  status: "idle",
  error: null,
};

const featuredHolidaysDetailsSlice = createSlice({
  name: "featuredHolidaysDetails/fetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedHolidaysDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeaturedHolidaysDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchFeaturedHolidaysDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default featuredHolidaysDetailsSlice.reducer;
