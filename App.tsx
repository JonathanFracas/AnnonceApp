import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./store";
import { PhoneAd } from "./models/PhoneAd";
import { HomeScreen } from "./screens/HomeScreen";
import { PhoneAdDetailsScreen } from "./screens/PhoneAdDetailsScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { PaperProvider } from "react-native-paper";

/**
 * Définition des types pour les routes de l'application.
 */
export type RootStackParamList = {
  // Ecran d'acceuil.
  "Liste des annonces": undefined;
  // Ecran des détails d'un film.
  Details: { phoneAd: PhoneAd };
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
    <PaperProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Liste des annonces"
            screenOptions={{
              headerStyle: {
                backgroundColor: "#6200ee",
              },
              headerTintColor: "#ffffff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
            }}>
            <Stack.Screen name="Liste des annonces" component={HomeScreen} />
            <Stack.Screen name="Details" component={PhoneAdDetailsScreen} />
            <Stack.Screen name="Favoris" component={FavoritesScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}
