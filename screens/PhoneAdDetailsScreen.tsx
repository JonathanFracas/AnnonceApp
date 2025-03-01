import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../globalState/favoritesSlice";
import { RootState } from "../store";
import type { StaticScreenProps } from "@react-navigation/native";
import { PhoneAd } from "../models/PhoneAd";
import {
  Card,
  Title,
  Paragraph,
  Button,
  Avatar,
  Text,
} from "react-native-paper";

/**
 * Typage des propriétés de l'affichage des détails d'une annonce de téléphone.
 */
type PhoneAdDetailsScreenProps = StaticScreenProps<{
  // L'annonce affichée.
  phoneAd: PhoneAd;
}>;

/**
 * Composant d'affichage des détails d'une annonce de téléphone.
 * @param props
 * @constructor
 */
export function PhoneAdDetailsScreen(
  props: Readonly<PhoneAdDetailsScreenProps>,
) {
  // Récupération de l'annonce passé en paramètre de navigation.
  const { phoneAd } = props.route.params;

  // Hook pour dispatcher des actions Redux.
  const dispatch = useDispatch();

  // Vérifie si l'annonce est dans les favoris.
  const isFavorite = useSelector((state: RootState) =>
    state.favorites.favorites.find((fav) => fav.id === phoneAd.id),
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card>
          <Card.Content>
            <Title style={styles.title}>{phoneAd.model}</Title>

            <View style={styles.phoneInfo}>
              <Text style={styles.subTitle}>Information :</Text>

              <Text>Prix : {phoneAd.price}€</Text>
              <Text>Système d'exploitation : {phoneAd.os}</Text>
              <Text>Marque : {phoneAd.constructor}</Text>
              <Text>Année de sortie : {phoneAd.releaseDate}</Text>
            </View>

            <View style={styles.salerInfo}>
              <Text style={styles.subTitle}>Vendeur :</Text>

              <View style={styles.salerDiv}>
                <Avatar.Image
                  source={{
                    uri: phoneAd.salerAvatar,
                  }}
                />

                <View style={styles.salerPersonnalInfos}>
                  <Text>
                    {phoneAd.salerGender === "Male" ? "M." : "Mme."}{" "}
                    {phoneAd.saler}
                  </Text>
                  <Text style={styles.salerTextInfo}>
                    Pays : {phoneAd.salerCountry} Ville : {phoneAd.salerCity}
                  </Text>
                  <Text style={styles.salerTextInfo}>
                    Tel : {phoneAd.phone}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.otherInfo}>
              <Text style={styles.subTitle}>Description :</Text>

              <Paragraph style={styles.overview}>
                {phoneAd.description}
              </Paragraph>
            </View>
          </Card.Content>
          <View style={styles.cardActions}>
            <Card.Actions>
              {isFavorite ? (
                <Button
                  mode={"outlined"}
                  onPress={() => dispatch(removeFavorite(phoneAd.id))}
                  icon={"minus-circle-outline"}>
                  Supprimer des favoris
                </Button>
              ) : (
                <Button
                  mode={"outlined"}
                  onPress={() => dispatch(addFavorite(phoneAd))}
                  icon={"plus-circle-outline"}>
                  Ajouter aux favoris
                </Button>
              )}
            </Card.Actions>
          </View>
        </Card>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  releaseDate: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  overview: {
    fontSize: 14,
    color: "#555",
  },
  subTitle: {
    fontWeight: "bold",
  },
  salerDiv: {
    display: "flex",
    flexDirection: "row",
  },
  salerTextInfo: {
    fontSize: 10,
  },
  salerPersonnalInfos: {
    marginLeft: 10,
    marginTop: 5,
  },
  cardActions: {
    alignItems: "center",
  },
  otherInfo: {
    margin: 5,
  },
  salerInfo: {
    margin: 5,
  },
  phoneInfo: {
    margin: 5,
  },
});
