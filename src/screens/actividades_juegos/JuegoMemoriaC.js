import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview'; // Importa WebView
import Sound from 'react-native-sound';
 
const JuegoMemoriaL = () => {
  return (
    <View style={styles.container}>
      <View style={styles.webviewContainer}>
        {/* Cargar el archivo HTML en WebView */}
        <WebView
          originWhitelist={['*']}
          source={require('../../../assets/htmlfiles/JuegoMemoriaC.html')} // Reemplaza con la ruta correcta a tu archivo HTML
          style={{ flex: 1 }}
        />
      </View>

      <View style={styles.audioButtonContainer}>
      <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
            <Text style={styles.audioButtonText}>🔊</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};
// Configurar el archivo de audio
const audioFile = new Sound('clicktarjetas.mp3', Sound.MAIN_BUNDLE, (error) => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#A3E1EF',
  },
  webviewContainer: {
    flex: 1, // Toma el espacio disponible
    
    width: '100%',
  },
  audioButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{ translateX: -25 }],
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

export default JuegoMemoriaL;
