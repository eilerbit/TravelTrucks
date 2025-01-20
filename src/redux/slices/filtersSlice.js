import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    location: "",
    form: "",
    features: [],
  },
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setType(state, action) {
      state.form = action.payload;
    },
    toggleFeature(state, action) {
      const feature = action.payload;
      if (state.features.includes(feature)) {
        state.features = state.features.filter((f) => f !== feature);
      } else {
        state.features.push(feature);
      }
    },
    clearFilters(state) {
      state.location = "";
      state.form = "";
      state.features = [];
    },
  },
});

export const { setLocation, setType, toggleFeature, clearFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
