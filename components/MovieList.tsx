import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Movie } from "../models/Movie";

/**
 * Les propriétés du composant d'un film d'une liste de films.
 */
type MovieItemProps = {
  // Le film.
  movie: Movie;
  // Méthode à appeler lors de l'appuie sur le film.
  onPressMovie: (movie: Movie) => void;
};

/**
 * Composant d'un film d'une liste de films.
 * @param movie - Le film.
 * @param onPressMovie - Méthode à appeler lors de l'appuie sur le film.
 * @constructor
 */
const MovieItem = ({ movie, onPressMovie }: MovieItemProps) => (
  <TouchableOpacity onPress={() => onPressMovie(movie)}>
    <View style={styles.movieContainer}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

/**
 * Propriétés du composant d'une liste de films.
 */
interface MovieListProps {
  // Les films de la liste.
  movies: Movie[];
  // Méthode appelée lors de l'appui sur un film.
  onPressMovie: (movie: Movie) => void;
}

/**
 * Composant d'une liste de film.
 * @param props
 * @constructor
 */
export function MovieList(props: Readonly<MovieListProps>) {
  return (
    <FlatList
      data={props.movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MovieItem movie={item} onPressMovie={props.onPressMovie} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  movieContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
