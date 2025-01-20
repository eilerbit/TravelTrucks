import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { handleApiError } from "../../utils/helpers";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ page = 1, limit = 4, filters = {} }, thunkAPI) => {
    try {
      const params = new URLSearchParams({
        page,
        limit,
        location: filters.location || "",
        type: filters.type || "",
      });

      if (filters.features && filters.features.length > 0) {
        filters.features.forEach((feature) =>
          params.append("features[]", feature)
        );
      }

      const response = await axios.get(`/campers?${params.toString()}`);
      return { items: response.data.items, total: response.data.total, page };
    } catch (error) {
      console.error("Error fetching campers:", error);
      return thunkAPI.rejectWithValue(handleApiError(error));
    }
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    list: [],
    total: 0,
    currentPage: 1,
    status: "idle",
    error: null,
  },
  reducers: {
    resetCampers(state) {
      state.list = [];
      state.total = 0;
      state.currentPage = 1;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        const { items, page, total } = action.payload;
        if (page === 1) {
          state.list = items;
        } else {
          state.list = [...state.list, ...items];
        }
        state.currentPage = page;
        state.total = total;
        state.status = "succeeded";
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetCampers } = campersSlice.actions;
export default campersSlice.reducer;
