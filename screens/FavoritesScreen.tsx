import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { MovieList } from "../components/MovieList";

/**
 * Typage des propriétés de l'écran des favoris.
 */
type FavoritesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Favoris"
>;

/**
 * Composant de l'ecran des favoris.
 * @constructor
 */
export function FavoritesScreen() {
  // Hook pour accéder à l'objet de navigation.
  const navigation = useNavigation<FavoritesScreenNavigationProp>();

  // Récupération de la liste des films favoris depuis l'état global.
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mes Favoris</Text>
      <MovieList
        movies={favorites}
        onPressMovie={(movie) => navigation.navigate("Details", { movie })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});
