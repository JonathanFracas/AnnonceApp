import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./store";
import { Movie } from "./models/Movie";
import { HomeScreen } from "./screens/HomeScreen";
import { MovieDetailsScreen } from "./screens/MovieDetailsScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";

/**
 * Définition des types pour les routes de l'application.
 */
export type RootStackParamList = {
  // Ecran d'acceuil.
  Home: undefined;
  // Ecran des détails d'un film.
  Details: { movie: Movie };
  // Ecran des favoris.
  Favoris: undefined;
};

// Crée une instance de la navigation avec les types définis.
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Composant principal de l'application.
 * @constructor
 */
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={MovieDetailsScreen} />
          <Stack.Screen name="Favoris" component={FavoritesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
