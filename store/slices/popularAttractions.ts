import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface PopularAttraction {
  id: number
  heading: string
  description: string
  image: string
  url: string
  country: string
}

export const fetchPopularAttractions = createAsyncThunk(
  "popularAttractions/fetch",
  async () => {
    const res = await fetch("https://www.localhost/projects/escapeelite.com/api/popular-attractions.php");
    const data = await res.json();
    // assuming your PHP API returns { success: true, data: [...] }
    console.log("slice pop");
    console.log(data.data);
    
    
    return data.data;
  }
);

interface PopularAttractionsState {
  data: PopularAttraction[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PopularAttractionsState = {
  data: [],
  status: "idle",
  error: null,
};

const PopularAttractionsSlice = createSlice({
  name: "popularAttractions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularAttractions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularAttractions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPopularAttractions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default PopularAttractionsSlice.reducer;
