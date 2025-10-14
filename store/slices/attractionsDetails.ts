import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

export const fetchAttractionsDetails = createAsyncThunk(
  "attractionsDetails/fetch",
  async (id: string) => {
    console.log("Fetching ID:", id);
    console.log(`https://www.localhost/projects/escapeelite.com/api/attractions-details.php?id=${id}`);
    
    const res = await fetch(
      `https://www.localhost/projects/escapeelite.com/api/attractions-details.php?id=${id}`
    );
    const data = await res.json();
    console.log("Fetched data:", data);
    return data.data;
  }
);


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
