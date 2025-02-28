import {
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import React from "react";

/**
 * Propriétés d'un composant de bouton.
 */
interface BetterButtonProps {
  // Le texte affiché dans le bouton.
  text: string;
  // La fonction appelée lors de l'appui sur le bouton.
  onPress: () => void;
  // Ajout de style optionnel au bouton.
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
}

/**
 * Composant d'un bouton.
 */
export default function BetterButton(props: Readonly<BetterButtonProps>) {
  return (
    <View>
      <TouchableOpacity
        style={[styles.button, props.buttonStyle]}
        onPress={props.onPress}>
        <Text style={[styles.buttonText, props.buttonTextStyle]}>
          {props.text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// Style par défaut
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  button: {
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "black",
  },
});
