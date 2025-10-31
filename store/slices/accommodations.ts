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

interface filter_options {
  countries: country[],
  locations: location[],
  types: type[],
  ratings: []
}

interface AccommodationData {
  data: Accommodation[],
  filter_options: filter_options
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

export const fetchAccommodations = createAsyncThunk(
  "accommodations/fetch",
  async () => {
    const res = await fetch(`https://www.localhost/projects/escapeelite.com/api/accommodations.php?`);
    const data: AccommodationData = await res.json();
    console.log("Fetched data:", data);
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
