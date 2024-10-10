import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Sound from 'react-native-sound';

const LMate = () => {
  const navigation = useNavigation();

  const backgroundImage = require('../../../assets/img/FondoL.png');
  const buttonImages = [
    require('../../../assets/img/L1.png'),
    require('../../../assets/img/L2.png'),
    require('../../../assets/img/L3.png'),
    require('../../../assets/img/L4.png'),
  ];
  const logoImage = require('../../../assets/img/ML.png');

  // Configurar el archivo de audio
  const audioFile = new Sound('seleccionaleccion.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  });

  const playAudio = () => {
    audioFile.play((success) => {
      if (!success) {
        console.log('Sound playback failed');
      }
    });
  };

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
        <View style={styles.logoContainer}>
          <Image source={logoImage} style={styles.logo} />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigateToScreen("L1mate")}>
            <Image source={buttonImages[0]} style={styles.buttonImage} />
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity style={styles.button} onPress={() => navigateToScreen("Ciencias")}>
            <Image source={buttonImages[1]} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigateToScreen("Matematica")}>
            <Image source={buttonImages[2]} style={styles.buttonImage} />
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity style={styles.button} onPress={() => navigateToScreen("Lenguaje")}>
            <Image source={buttonImages[3]} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.audioButtonContainer}>
          <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
            <Text style={styles.audioButtonText}>🔊</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: [{ translateX: -100 }], // Centra horizontalmente
  },
  logo: {
    width: 250,
    height: 250,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
    marginTop: 10, // Añadir margen superior aquí
  },
  button: {
    width: 150,
    height: 150,
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  space: {
    width: 10, // Espacio entre los botones
  },
  audioButtonContainer: {
    position: 'absolute',
    bottom: 20, // Ajusta esta distancia según sea necesario
    left: '50%',
    transform: [{ translateX: -25 }], // Ajusta el valor para centrar horizontalmente
  },
  audioButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 5,
  },
  audioButtonText: {
    fontSize: 30,
    color: '#000',
  },
});

export default LMate;