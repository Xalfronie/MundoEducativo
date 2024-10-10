import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


const ClaPaS = () => {
  const navigation = useNavigation();

  const navigateToGame = () => {
    navigation.navigate("WordClassificationGame", { subject: "Sociales" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sociales</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToGame}>
        <Text style={styles.buttonText}>Empezar Juego</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A3E1EF",
  },
  title: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#57c1e6",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default ClaPaS;
