import { createSlice } from "@reduxjs/toolkit";
import { saveToLocalStorage, loadFromLocalStorage } from "../../utils/helpers";

const initialState = {
  items: loadFromLocalStorage("favorites") || [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action) {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
        saveToLocalStorage("favorites", state.items);
      }
    },
    removeFavorite(state, action) {
      state.items = state.items.filter((id) => id !== action.payload);
      saveToLocalStorage("favorites", state.items);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
