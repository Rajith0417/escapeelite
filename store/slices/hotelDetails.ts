import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Hotel {
  id: string
  slug: string
  name: string
  description: string
  star_rating: number
  category: Category
  country: Country
  location: Location
  tripadvisor_code: string
  youtube_url_id: string
  facilities_html: string
  nearby_attractions_html: string
  show_price: boolean
//   labels: any[]
  images: string[]
  room_types_summary: RoomTypesSummary
  basis_types_summary: BasisTypesSummary
//   price_data: any
  airports: Airport[]
  airlines: Airline[]
}

export interface Category {
  name: string
  slug: string
}

export interface Country {
  id: string
  name: string
  slug: string
  // resort_only: boolean
}

export interface Location {
  latitude: number
  longitude: number
}

export interface RoomTypesSummary {
  id: string
  hotel_id: string
  standard: string
  standard_num_of_persons: string
  superior: string
  superior_num_of_persons: string
  deluxe: string
  deluxe_num_of_persons: string
  luxury: string
  luxury_num_of_persons: string
  created_at: string
  updated_at: string
}

export interface BasisTypesSummary {
  id: string
  hotel_id: string
  bb: string
  hb: string
  fb: string
  ai: string
  created_at: string
  updated_at: string
}

export interface Airport {
  id: string
  airport_name: string
  created_at: string
  updated_at?: string
}

export interface Airline {
  id: string
  airline_name: string
  created_at: string
  updated_at?: string
}

export const fetchHotelDetails = createAsyncThunk(
  "hotelDetails/fetch",
  async (slug: string) => {
    const res = await fetch(`https://www.escapeinsrilanka.com/api/hotel-details.php/${slug}`);
    const data = await res.json();
    // assuming your PHP API returns { success: true, data: [...] }
    console.log("hotel data");
    
    console.log(data);
    return data.data;
  }
);

interface HotelDetailsState {
  data: Hotel | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: HotelDetailsState = {
  data: null,
  status: "idle",
  error: null,
};

const hotelDetailsSlice = createSlice({
  name: "hotelDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotelDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHotelDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchHotelDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default hotelDetailsSlice.reducer;
