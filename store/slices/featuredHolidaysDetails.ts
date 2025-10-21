import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface FeaturedHolidaysDetails {
  id: number;
  package_slug: string;
  package_name: string;
  package_description: string;
  price_starting_from: number;
  package_category_id: number;
  package_order: number;
  pkg_category_slug: string;
  no_of_nights: number;
  no_of_days: number;
  image: string;
  attractions: string[];
  best_times: string;
}

// In your featuredHolidaysDetails slice file
interface PackageCategory {
  id: number;
  pkg_category_name: string;
  pkg_category_slug: string;
}

interface HolidayPackage {
  id: number;
  package_slug: string;
  package_name: string;
  package_description: string;
  price_starting_from: number;
  package_category_id: number;
  package_order: number;
  pkg_category_slug: string;
  no_of_nights: number;
  no_of_days: number;
  image: string;
  attractions: string[];
  best_times: string;
}

interface country {
  id: number;
  country_name: string;
  resort_only: string;
}

interface FeaturedHolidaysData {
  country_data: country; // You can make this more specific if needed
  packages: HolidayPackage[];
  // Note: Pagination data is usually handled separately or embedded here if needed
}

interface FeaturedHolidaysDetailsState {
  // Modify 'data' to hold the structure of the successful response data
  data: FeaturedHolidaysData | null;

  // ✅ ADD THIS NEW PROPERTY: featuredCategories
  featuredCategories: PackageCategory[] | null;

  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchFeaturedHolidaysDetails = createAsyncThunk(
  "featuredHolidaysDetails/fetch",
  async (country: string) => {
    // console.log("Fetching country:", country);
    // console.log(`https://www.localhost/projects/escapeelite.com/api/featured-holidays-details.php?country=${country}`);
    const res = await fetch(
      `https://www.localhost/projects/escapeelite.com/api/featured-holidays-details.php?country=${country}`
    );
    const data = await res.json();
    // console.log("Fetched data--:", data);
    return data;
  }
);

interface AttractionsState {
  data: FeaturedHolidaysDetails[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FeaturedHolidaysDetailsState = {
  data: null,
  
  // ✅ ADD THIS: Initialize the new property as an empty array or null
  featuredCategories: [], // Initialize as an empty array for safer mapping
  
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
      // .addCase(fetchFeaturedHolidaysDetails.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.data = action.payload;
      // })
      .addCase(fetchFeaturedHolidaysDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Assuming action.payload is the full response object
        state.data = {
          country_data: action.payload.country_data,
          packages: action.payload.packages, // Store packages array
        };
        state.featuredCategories = action.payload.featured_categories; // Store categories array
      })
      .addCase(fetchFeaturedHolidaysDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default featuredHolidaysDetailsSlice.reducer;
