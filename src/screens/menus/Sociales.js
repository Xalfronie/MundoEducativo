import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sound from 'react-native-sound';

// Configurar la ruta de los archivos de audio
const audioFiles = {
  lecciones: new Sound('leccionesdisponibles.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  }),
  actividades: new Sound('actividadesdispo.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  }),
};

const playAudio = (audio) => {
  audio.play((success) => {
    if (!success) {
      console.log('Sound playback failed');
    }
  });
};

const Sociales = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SocialesLecciones')}>
          <ImageBackground source={require('../../../assets/img/lecciones.png')} style={styles.image}>
            
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.audioButton} onPress={() => playAudio(audioFiles.lecciones)}>
          <Text style={styles.audioButtonText}>🔊</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SocialesActividades')}>
          <ImageBackground source={require('../../../assets/img/actividades.png')} style={styles.image}>
            
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.audioButton} onPress={() => playAudio(audioFiles.actividades)}>
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
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    width: 280, // Reduce el ancho del botón
    height: 150,
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 20, 
  },
  image: {
    width: '100%', 
    height: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioButton: {
    marginLeft: 5, // Reduce el margen izquierdo
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 5,
  },
  audioButtonText: {
    fontSize: 16,
  },
});

export default Sociales;