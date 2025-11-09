import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Accommodation {
  id: number
  name: string
  slug: string
  description_preview: string
  star_rating: number
  category_name: string
  category_slug: string
  country_slug: string
  image_url: string
  detail_url: string
}

interface country {
  name: string,
  slug: string,
}

interface location {
  id: number,
  name: string
}

interface type {
  name: string,
  slug: string
}

interface rating {
  id: string;
  name: string;
}

interface filter_options {
  countries: country[], // Should be an array of country objects
  cities: location[],   // Should be an array of location objects
  types: type[],
  ratings: rating[]    // Should be an array of strings (or rating objects)
}

interface AccommodationData {
  data: Accommodation[],
  filter_options: filter_options // Now correctly points to the arrays
}

interface AccommodationsState {
  data: AccommodationData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AccommodationsState = {
  data: null,
  status: "idle",
  error: null,
};

interface FilterApiArgs {
  name: string,
  country: string, // These are the *values* to pass to the API
  city: string,
  type: string,
  rating: string
}

export const fetchAccommodations = createAsyncThunk(
  "accommodations/fetch",
  // Use the renamed argument interface
  async ({name, country, city, type, rating}: FilterApiArgs) => { 
    const res = await fetch(`https://www.escapeinsrilanka.com/api/accommodations.php?name=${name}&country=${country}&city=${city}&type=${type}&rating=${rating}`);
    const data: AccommodationData = await res.json();
    console.log(`https://www.escapeinsrilanka.com/api/accommodations.php?name=${name}&country=${country}&city=${city}&type=${type}&rating=${rating}`);
    console.log("Fetched accommodations data:", data);
    return data;
  }
);

const AccommodationsSlice = createSlice({
  name: "attractionsDetails/fetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccommodations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAccommodations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAccommodations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default AccommodationsSlice.reducer;
