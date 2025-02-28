import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../globalState/favoritesSlice";
import { RootState } from "../store";
import type { StaticScreenProps } from "@react-navigation/native";
import { Movie } from "../models/Movie";
import BetterButton from "../components/utils/BetterButton";

/**
 * Typage des propriétés de l'affichage des détails d'un film.
 */
type MovieDetailsScreenProps = StaticScreenProps<{
  // Le film affiché.
  movie: Movie;
}>;

/**
 * Composant d'affichage des détails d'un film.
 * @param props
 * @constructor
 */
export function MovieDetailsScreen(props: Readonly<MovieDetailsScreenProps>) {
  // Récupération du film passé en paramètre de navigation.
  const { movie } = props.route.params;

  // Hook pour dispatcher des actions Redux.
  const dispatch = useDispatch();

  // Vérifie si le film est dans les favoris.
  const isFavorite = useSelector((state: RootState) =>
    state.favorites.favorites.find((fav) => fav.id === movie.id),
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={styles.poster}
        />
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.releaseDate}>
          Date de sortie: {movie.release_date}
        </Text>
        <Text style={styles.vote}>Note: {movie.vote_average}/10</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        {isFavorite ? (
          <BetterButton
            text="Supprimer des favoris"
            onPress={() => dispatch(removeFavorite(movie.id))}
            buttonStyle={styles.removeButton}
          />
        ) : (
          <BetterButton
            text="Ajouter aux favoris"
            onPress={() => dispatch(addFavorite(movie))}
            buttonStyle={styles.addButton}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  poster: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  releaseDate: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  vote: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  overview: {
    fontSize: 14,
    color: "#555",
  },
  addButton: {
    backgroundColor: "lightgreen",
  },
  removeButton: {
    backgroundColor: "red",
  },
});
