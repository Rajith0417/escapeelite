import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Testimonial {
  description: string;
  customer: string;
  location: string;
  image: string;
}

export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetch",
  async () => {
    const res = await fetch("https://www.escapeinsrilanka.com/api/testimonials.php");
    const data = await res.json();
    // assuming your PHP API returns { success: true, data: [...] }
    return data.data;
  }
);

interface TestimonialsState {
  data: Testimonial[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TestimonialsState = {
  data: [],
  status: "idle",
  error: null,
};

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default testimonialsSlice.reducer;
