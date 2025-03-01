import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { getPhonesAds, PhoneAd } from "../models/PhoneAd";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { PhoneAdsList } from "../components/PhoneAdsList";
import { Button, Card, Text, TextInput } from "react-native-paper";

/**
 * Typage des propriétés de l'ecran d'acceuil.
 */
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Liste des annonces"
>;

/**
 * Composant de l'ecran d'acceuil.
 * @constructor
 */
export function HomeScreen() {
  // Les annonces disponibles.
  const [phoneAds, setPhoneAds] = useState<PhoneAd[]>([]);
  // Le modele recherché.
  const [model, setModel] = useState<string>("");
  // La variable de navigation.
  const navigation = useNavigation<HomeScreenNavigationProp>();
  // Les annonces à afficher.
  const [phoneAdsToDisplay, setPhoneAdsToDisplay] = useState<PhoneAd[]>([]);
  // Le nombre de favoris.
  const favoritesCount: number = useSelector(
    (state: RootState) => state.favorites.favorites.length,
  );

  /**
   * Méthode appelée lors du "mount" du composant.
   */
  useEffect((): void => {
    const fetchPhoneAds = async (): Promise<void> => {
      setPhoneAds(await getPhonesAds());
    };

    fetchPhoneAds();
  }, []);

  /**
   * Méthode appelée lors d'un changement de la liste des annonces disponibles.
   */
  useEffect(() => {
    handlePhoneAdsToDisplayChange(phoneAds);
  }, [phoneAds]);

  /**
   * Méthode gérant la mise à jour des annonces à afficher.
   * @param phoneAdsToDisplay - Les annonces à afficher.
   */
  const handlePhoneAdsToDisplayChange = (
    phoneAdsToDisplay: PhoneAd[],
  ): void => {
    setPhoneAdsToDisplay(phoneAdsToDisplay);
  };

  /**
   * Méthode gérant l'appui sur une annonce.
   * @param phoneAd - L'annonce sur laquelle on a appuyé.
   */
  const handlePressPhoneAd = (phoneAd: PhoneAd): void => {
    navigation.navigate("Details", { phoneAd: phoneAd });
  };

  /**
   * Méthode gérant la modification du champ de recherche de modele.
   * @param model - Le modele cherché.
   */
  const handleModelSearchChange = (model: string): void => {
    setModel(model);
    // On récupère les modeles correspondant à la recherche.
    const phoneAdsToDisplay: PhoneAd[] = phoneAds.filter((phoneAd) => {
      return phoneAd.model.includes(model);
    });
    // Mise à jour des annonces à afficher.
    handlePhoneAdsToDisplayChange(phoneAdsToDisplay);
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <View style={styles.content}>
            <Button
              mode={"outlined"}
              onPress={() => navigation.navigate("Favoris")}
              icon={"heart"}>
              Mes favoris {favoritesCount}
            </Button>
          </View>

          <View style={styles.content}>
            <TextInput
              value={model}
              onChangeText={(text) => handleModelSearchChange(text)}
              placeholder={"Rechercher un modele"}
            />
          </View>

          <View style={styles.content}>
            <Text>Nombre d'annonces : {phoneAdsToDisplay.length}</Text>
          </View>

          <View>
            <PhoneAdsList
              phoneAds={phoneAdsToDisplay}
              onPressPhoneAd={handlePressPhoneAd}
            />
          </View>

        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },

  content: {
    margin: 5,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});
