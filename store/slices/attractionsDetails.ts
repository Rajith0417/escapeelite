import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Details {
  id: string;
  heading: string;
  description: string;
  image: string;
}

interface AttractionDetails {
  id: string;
  heading: string;
  description: string;
  image: string;
  details: Details[];
}
interface AttractionsState {
  data: AttractionDetails | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AttractionsState = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchAttractionsDetails = createAsyncThunk(
  "attractionsDetails/fetch",
  async (id: string) => {
    const res = await fetch(
      `https://www.escapeinsrilanka.com/api/attractions-details.php?id=${id}`
    );
    const data = await res.json();
    console.log("Fetched data:", data);
    return data.data;
  }
);

const AttractionsDetailsSlice = createSlice({
  name: "attractionsDetails/fetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttractionsDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAttractionsDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAttractionsDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default AttractionsDetailsSlice.reducer;
