import React from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { PhoneAd } from "../models/PhoneAd";
import { Card, Paragraph, Title, Text } from "react-native-paper";

/**
 * Les propriétés du composant d'un film d'une liste de films.
 */
type MovieItemProps = {
  // Le film.
  phoneAd: PhoneAd;
  // Méthode à appeler lors de l'appuie sur le film.
  onPressPhoneAdd: (phoneAd: PhoneAd) => void;
};

/**
 * Composant d'un film d'une liste de films.
 * @param movie - Le film.
 * @param onPressMovie - Méthode à appeler lors de l'appuie sur le film.
 * @constructor
 */
const PhoneAdItem = ({ phoneAd, onPressPhoneAdd }: MovieItemProps) => (
  <TouchableOpacity onPress={() => onPressPhoneAdd(phoneAd)}>
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.info}>
          <Title style={styles.title}>{phoneAd.model}</Title>

          <Text style={styles.subtitle}>
            {phoneAd.releaseDate} - {phoneAd.price}€
          </Text>
          <Paragraph>{phoneAd.description}</Paragraph>
        </View>
      </Card.Content>
    </Card>
  </TouchableOpacity>
);

/**
 * Propriétés du composant d'une liste de films.
 */
interface MovieListProps {
  // Les films de la liste.
  phoneAds: PhoneAd[];
  // Méthode appelée lors de l'appui sur un film.
  onPressPhoneAd: (movie: PhoneAd) => void;
}

/**
 * Composant d'une liste de film.
 * @param props
 * @constructor
 */
export function PhoneAdsList(props: Readonly<MovieListProps>) {
  return (
    <FlatList
      data={props.phoneAds}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PhoneAdItem phoneAd={item} onPressPhoneAdd={props.onPressPhoneAd} />
      )}
      contentContainerStyle={styles.listContent}
      ListFooterComponent={<View style={{ height: 200 }} />}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    elevation: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  poster: {
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listContent: {
    padding: 8,
    flexGrow: 1,
  },
  subtitle: {
    fontStyle: "italic",
  },
});
