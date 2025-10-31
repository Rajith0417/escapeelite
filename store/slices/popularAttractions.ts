import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * ------------------------------------------------
 * 1. INTERFACES
 * ------------------------------------------------
 */

// Interface for a single attraction item
interface PopularAttraction {
  id: number;
  heading: string;
  description: string;
  image: string;
  country: string; // The backend only provides country_slug
}

// Interface for the pagination metadata
interface PaginationInfo {
    total_items: number;
    items_per_page: number;
    current_page: number;
    total_pages: number;
    next_page: number | null;
    prev_page: number | null;
}

// Interface for the full API response structure
interface ApiResponse {
    success: boolean;
    data: PopularAttraction[];
    pagination: PaginationInfo;
}

// Interface for the async thunk argument (optional country and page)
interface FetchParams {
    country?: string; // Optional country slug
    page?: number;    // Optional page number
}

// Interface for the Redux slice state
interface PopularAttractionsState {
  data: PopularAttraction[];
  pagination: PaginationInfo | null; // Store pagination info
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

/**
 * ------------------------------------------------
 * 2. ASYNC THUNK
 * ------------------------------------------------
 */

export const fetchPopularAttractions = createAsyncThunk(
  "popularAttractions/fetch",
  // The thunk now accepts an object with optional country and page
  async (params: FetchParams, { rejectWithValue }) => {
    
    const { country, page } = params;
    
    // Start building the query string
    const queryParams = new URLSearchParams();

    // Add country to query params if it exists
    if (country) {
        queryParams.append('country', country);
    }
    
    // Add page to query params if it exists and is valid
    if (page && page > 0) {
        queryParams.append('page', page.toString());
    }

    // Construct the final URL
    const baseUrl = 'https://www.localhost/projects/escapeelite.com/api/popular-attractions.php';
    const finalUrl = `${baseUrl}?${queryParams.toString()}`;

    try {
        const res = await fetch(finalUrl);
        
        if (!res.ok) {
            // Throw an error if the response status is not successful (e.g., 404, 500)
            const errorData = await res.json();
            return rejectWithValue(errorData.error || `HTTP error! status: ${res.status}`);
        }

        const data: ApiResponse = await res.json();
        
        // Return the full response data (including pagination)
        return data; 

    } catch (error) {
        // Handle network errors or JSON parsing errors
        return rejectWithValue("Failed to fetch data or network error.");
    }
  }
);

/**
 * ------------------------------------------------
 * 3. SLICE DEFINITION
 * ------------------------------------------------
 */

const initialPagination: PaginationInfo = {
    total_items: 0,
    items_per_page: 12,
    current_page: 1,
    total_pages: 0,
    next_page: null,
    prev_page: null,
};

const initialState: PopularAttractionsState = {
  data: [],
  pagination: initialPagination,
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
        state.error = null;
      })
      .addCase(fetchPopularAttractions.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
        state.status = "succeeded";
        // Update the attraction data
        state.data = action.payload.data;
        // Update the pagination metadata
        state.pagination = action.payload.pagination; 
      })
      .addCase(fetchPopularAttractions.rejected, (state, action) => {
        state.status = "failed";
        // action.payload is the error message from rejectWithValue
        state.error = (action.payload as string) || action.error.message || "Something went wrong";
        state.data = []; // Clear data on failure
        state.pagination = initialPagination; // Reset pagination info
      });
  },
});

export default PopularAttractionsSlice.reducer;
