import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "./slices/campersSlice";
import filtersReducer from "./slices/filtersSlice";
import favoritesReducer from "./slices/favoritesSlice";

const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
});

export default store;
