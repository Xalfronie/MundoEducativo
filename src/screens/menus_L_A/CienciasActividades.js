import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sound from 'react-native-sound';

const CienciasActividades = () => {
  const navigation = useNavigation();

  // Configurar el archivo de audio
  const audioFile = new Sound('seleccionaactividad.mp3', Sound.MAIN_BUNDLE, (error) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ActividadArrastrarSoLtarC')}>
          <ImageBackground source={require('../../../assets/img/arrastrar.jpeg')} style={styles.imageBackground} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('JuegoMemoriaC')}>
          <ImageBackground source={require('../../../assets/img/memoria.jpeg')} style={styles.imageBackground} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ClasificacionPalabrasC')}>
          <ImageBackground source={require('../../../assets/img/palabras.jpeg')} style={styles.imageBackground} />
        </TouchableOpacity>
      </View>
      <View style={styles.audioButtonContainer}>
        <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
          <Text style={styles.audioButtonText}>🔊</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A3E1EF',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  button: {
    width: 150,
    height: 150,
    marginVertical: 15,
    borderRadius: 15,
    overflow: 'hidden', // Ensure rounded corners are applied to ImageBackground
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioButtonContainer: {
    position: 'absolute',
    top: 110, // Ajusta esta distancia según sea necesario
    left: '53.9%',
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

export default CienciasActividades;