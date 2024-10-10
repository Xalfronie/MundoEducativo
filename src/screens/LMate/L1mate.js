import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

// Asegúrate de importar las imágenes correctamente desde tu carpeta de assets
const image1 = require('../../../assets/img/S1.png');
const image2 = require('../../../assets/img/S2.png');
const image3 = require('../../../assets/img/S3.png');
const image4 = require('../../../assets/img/S4.png');
const image5 = require('../../../assets/img/S5.png');

const videos = [
  { id: "vDMzEnEv-gw", title: "Video Educativo sobre Sumas Básicas" },
  // Agrega más videos con sus títulos aquí
];

const L1mate = () => {
  const [playing, setPlaying] = useState({});

  const onStateChange = useCallback((state, videoId) => {
    if (state === 'ended') {
      setPlaying(prev => ({ ...prev, [videoId]: false }));
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sumas Básicas</Text>
      
      <View style={styles.imageContainer}>
        {/* Puedes agregar imágenes aquí si es necesario */}
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>¿Qué es una suma?</Text>
        <Text style={styles.text1}>La suma es una operación matemática fundamental que combina dos o más números para obtener un total o una cantidad agregada. En términos sencillos, es el proceso de agregar valores para encontrar el resultado total.</Text>
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Ejemplo de Suma</Text>
        <Text style={styles.text1}>Por ejemplo: si tienes 1 manzana y le agregas otra manzana más, tendrás un total de 2 manzanas.</Text>
        <Image source={image1} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Ejemplo de Suma</Text>
        <Text style={styles.text1}>Por ejemplo: si tienes 2 manzanas y le agregas otras 2 manzanas, tendrás un total de 4 manzanas.</Text>
        <Image source={image2} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Ejemplo de Suma</Text>
        <Text style={styles.text1}>Por ejemplo: si tienes 3 manzanas y le agregas otras 3 manzanas, tendrás un total de 6 manzanas.</Text>
        <Image source={image4} style={styles.image} />
      </View>
      
      <View style={styles.textBox}>
        <Text style={styles.text}>Ejemplo de Suma</Text>
        <Text style={styles.text1}>Por ejemplo: si tienes 3 manzanas y le agregas 1 manzana más, tendrás un total de 4 manzanas.</Text>
        <Image source={image3} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Ejemplo de Suma</Text>
        <Text style={styles.text1}>Por ejemplo: si tienes 3 manzanas y le agregas 4 manzanas más, tendrás un total de 7 manzanas.</Text>
        <Image source={image5} style={styles.image} />
      </View>

      {/* Video de YouTube */}
      <View style={styles.videoSection}>
        {videos.map((video, index) => (
          <View key={index} style={styles.videoContainer}>
            <Text style={styles.videoTitle}>{video.title}</Text>
            <YoutubeIframe
              height={Dimensions.get('window').height * 0.5} // 50% del alto de la pantalla
              width={Dimensions.get('window').width * 0.9} // 90% del ancho de la pantalla
              videoId={video.id}
              play={playing[video.id] || false}
              onChangeState={(state) => onStateChange(state, video.id)}
              webViewProps={{
                allowsFullscreenVideo: true,
              }}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e6dcf8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
  },
  textBox: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  text1: {
    color: '#000000',
    fontSize: 17,
  },
  videoSection: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  videoContainer: {
    marginBottom: -220, // Espacio entre videos
    alignItems: 'center',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5, // Espacio pequeño entre el título y el video
    textAlign: 'center',
  },
});

export default L1mate;