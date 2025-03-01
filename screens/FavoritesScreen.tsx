import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { PhoneAdsList } from "../components/PhoneAdsList";
import { Text, Surface } from "react-native-paper";
import { PhoneAd } from "../models/PhoneAd";

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
  const navigation: FavoritesScreenNavigationProp =
    useNavigation<FavoritesScreenNavigationProp>();

  // Récupération de la liste des films favoris depuis l'état global.
  const favorites: PhoneAd[] = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  return (
    <View style={styles.container}>
      <Surface style={styles.content}>
        {favorites.length > 0 ? (
          <>
            <Text style={styles.header}>Mes favoris</Text>
            <PhoneAdsList
              phoneAds={favorites}
              onPressPhoneAd={(phoneAd) =>
                navigation.navigate("Details", { phoneAd })
              }
            />
          </>
        ) : (
          <Text style={styles.emptyText}>
            Aucun téléphone en favoris pour le moment
          </Text>
        )}
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginTop: 20,
  },
});
