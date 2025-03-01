import React from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { PhoneAd } from "../models/PhoneAd";
import { Card, Paragraph, Title, Text } from "react-native-paper";

/**
 * Les propriétés du composant d'une annonce de téléphone.
 */
type PhoneAdItemProps = {
  // L'annonce.
  phoneAd: PhoneAd;
  // Méthode à appeler lors de l'appuie sur l'annonce.
  onPressPhoneAdd: (phoneAd: PhoneAd) => void;
};

/**
 * Composant d'une annonce de téléphone.
 * @param phoneAd - Le film.
 * @param onPressPhoneAdd - Méthode à appeler lors de l'appuie sur l'annonce.
 * @constructor
 */
const PhoneAdItem = ({ phoneAd, onPressPhoneAdd }: PhoneAdItemProps) => (
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
 * Propriétés du composant d'une liste d'annonces de téléphone.
 */
interface MovieListProps {
  // Les annnonces de la liste.
  phoneAds: PhoneAd[];
  // Méthode appelée lors de l'appui sur une annonce.
  onPressPhoneAd: (movie: PhoneAd) => void;
}

/**
 * Composant d'une liste d'annonce de téléphone.
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
