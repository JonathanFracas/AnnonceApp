import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PhoneAd } from "../models/PhoneAd";

/**
 * Interface de l'état global des favoris.
 */
interface FavoritesState {
  favorites: PhoneAd[];
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
    addFavorite: (state, action: PayloadAction<PhoneAd>) => {
      if (!state.favorites.find((movie) => movie.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },

    /**
     * Supprime un film de la liste des favoris.
     * @param state - L'état global.
     * @param action - Le film supprimé.
     */
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload,
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
