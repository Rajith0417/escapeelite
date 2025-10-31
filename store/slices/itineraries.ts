import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface ItineraryData {
  id: number
  package_name: string
  package_map: string
  package_category_id: number
  country_id: number
  category: Category
  country: Country
//   daily_child_price: any
  basis_types: BasisTypes
  images: string[]
  itinerary: Itinerary[]
}

export interface Category {
  pkg_category_name: string
  pkg_category_slug: string
}

export interface Country {
  country_name: string
  country_slug: string
  // resort_only: number
}

export interface BasisTypes {
  id: number
  package_id: number
  bb: string
  hb: string
  fb: string
  ai: string
  created_at: string
  updated_at: string
}

// export interface Image {
//   image_path: string
// }

export interface Itinerary {
  group_id: number
  days: number[]
  cities: string[]
  options: Option[]
}

export interface Option {
  option_id: number
  description: string
  over_night_stay: string
  images: string[]
  attractions: Attraction[]
  transport_options: TransportOption[]
  accommodations: accommodations
}

export interface accommodations {
  "2": hotelDetails[]
  "3": hotelDetails[]
  "4": hotelDetails[]
}

export interface hotelDetails {
  name: string
  category_id: number
  hotel_id: number
}

// export interface Image2 {
//   itinerary_image_path: string
// }

export interface Attraction {
  attraction_detail_id: number
  attraction_detail_heading: string
  attraction_detail_description: string
  attraction_detail_image_path: string
}

export interface TransportOption {
  transportation_name: string
  transportation_logo: string
  transportation_image: string
  transportation_description: string
  transfer_time?: string
  include_in_price?: number
  show_to_front?: number
}

interface ItinerariesProp {
    country: string;
    packageSlug: string;
    category: string;
}


export const fetchItineraries = createAsyncThunk(
  "itineraries/fetch",
  async ({country, packageSlug, category}: ItinerariesProp) => {
    const res = await fetch(`https://www.localhost/projects/escapeelite.com/api/itineraries.php?country=${country}&packageSlug=${packageSlug}&category=${category}`);
    // console.log("-----0-----");
    // console.log(`https://www.localhost/projects/escapeelite.com/api/itineraries.php?country=${country}&packageSlug=${packageSlug}&category=${category}`);
    const data = await res.json();
    // assuming your PHP API returns { success: true, data: [...] }
    // console.log(data.data);
    
    return data.data;
  }
);

interface ItinerariesState {
  data: ItineraryData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ItinerariesState = {
  data: null,
  status: "idle",
  error: null,
};

const ItinerariesSlice = createSlice({
  name: "itineraries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItineraries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItineraries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchItineraries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default ItinerariesSlice.reducer;
