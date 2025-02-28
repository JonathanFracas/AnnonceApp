import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../models/Movie";

/**
 * Interface de l'état global des favoris.
 */
interface FavoritesState {
  favorites: Movie[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    /**
     * Ajoute un film dans la liste des favoris.
     * @param state - L'état global.
     * @param action - Le film ajouté.
     */
    addFavorite: (state, action: PayloadAction<Movie>) => {
      if (!state.favorites.find((movie) => movie.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },

    /**
     * Supprime un film de la liste des favoris.
     * @param state - L'état global.
     * @param action - Le film supprimé.
     */
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload,
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
