import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { getMovies, Movie } from "../models/Movie";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import BetterButton from "../components/utils/BetterButton";
import { MovieList } from "../components/MovieList";

/**
 * Typage des propriétés de l'ecran d'acceuil.
 */
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

/**
 * Composant de l'ecran d'acceuil.
 * @constructor
 */
export function HomeScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const favoritesCount = useSelector(
    (state: RootState) => state.favorites.favorites.length,
  );

  useEffect(() => {
    const fetchMovies = async () => {
      setMovies(await getMovies());
    };

    fetchMovies();
  }, []);

  const handlePressMovie = (movie: Movie) => {
    navigation.navigate("Details", { movie });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Les films</Text>
      <BetterButton
        text={`Mes favoris (${favoritesCount})`}
        onPress={() => navigation.navigate("Favoris")}
        buttonStyle={styles.button}
      />
      <MovieList movies={movies} onPressMovie={handlePressMovie} />
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
  button: {
    backgroundColor: "lightblue",
  },
});
