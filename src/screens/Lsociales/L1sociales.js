import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Modal, TouchableOpacity, Dimensions } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
// Asegúrate de importar las imágenes correctamente desde tu carpeta de assets
const image1 = require('../../../assets/img/Doctor.png');
const image2 = require('../../../assets/img/Policia.png');
const image3 = require('../../../assets/img/Maestro.png');
const image4 = require('../../../assets/img/Bombero.png');
const infographicProfessions = require('../../../assets/img/profesiones.png');
const infographicTrades = require('../../../assets/img/oficios.png');

const videos = [
  { id: "YH2lML9lAR8", title: "Video Educativo Estudios Sociales" },
  // Agrega más videos con sus títulos aquí
];

const L1sociales = () => {
  const [professionsModalVisible, setProfessionsModalVisible] = useState(false);
  const [tradesModalVisible, setTradesModalVisible] = useState(false);
  const [playing, setPlaying] = useState({});

  const onStateChange = useCallback((state, videoId) => {
    if (state === 'ended') {
      setPlaying(prev => ({ ...prev, [videoId]: false }));
    }
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.videoContainer}>
      <Text style={styles.videoTitle}>{item.title}</Text>
      <YoutubeIframe
        height={Dimensions.get('window').height * 0.5} // 50% del alto de la pantalla
        width={Dimensions.get('window').width * 0.9} // 90% del ancho de la pantalla
        videoId={item.id}
        play={playing[item.id] || false}
        onChangeState={(state) => onStateChange(state, item.id)}
        webViewProps={{
          allowsFullscreenVideo: true,
        }}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Las Profesiones y Oficios</Text>
      
      <View style={styles.imageContainer}>
        <Image source={image1} style={styles.image} />
        <Image source={image2} style={styles.image} />
        <Image source={image3} style={styles.image} />
        <Image source={image4} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>¿Qué es una profesión?</Text>
        <Text style={styles.text1}>
          Una profesión es un trabajo que las personas hacen para ayudar a los demás y ganar dinero. Por ejemplo, un maestro enseña a los niños, un médico cuida a las personas enfermas, y un bombero apaga incendios. Cada profesión es importante porque ayuda a que nuestra comunidad sea un buen lugar para vivir.
        </Text>
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>¿Qué es un oficio?</Text>
        <Text style={styles.text1}>
          Un oficio es la actividad habitual que efectúa un individuo, la cual es aprendida a través de la experiencia, es decir, se aprende en la misma práctica del oficio en cuestión. Por ejemplo: el oficio de zapatero, de carpintero, de músico, de pintor, entre otros.
        </Text>
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>Diferencia entre Profesión y Oficio</Text>
        <Text style={styles.text1}>
          Una profesión es un trabajo que necesita mucho estudio y entrenamiento especial. Por ejemplo, los médicos tienen que ir a la universidad y aprender muchas cosas para poder cuidar a las personas enfermas.
        </Text>
        <Text style={styles.text1}>
          Un oficio es un trabajo que también es muy importante, pero no necesita tanto estudio en la universidad. En cambio, se aprende más practicando y trabajando. Por ejemplo, los carpinteros construyen cosas con madera y aprenden su trabajo ayudando a otros carpinteros.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setProfessionsModalVisible(true)}>
        <Text style={styles.buttonText}>Ejemplos de Profesiones</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setTradesModalVisible(true)}>
        <Text style={styles.buttonText}>Ejemplos de Oficios</Text>
      </TouchableOpacity>

      {/* Modal para Profesiones */}
      <Modal
        visible={professionsModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setProfessionsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Image source={infographicProfessions} style={styles.infographic} resizeMode="contain" />
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => setProfessionsModalVisible(false)}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para Oficios */}
      <Modal
        visible={tradesModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setTradesModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Image source={infographicTrades} style={styles.infographic} resizeMode="contain" />
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => setTradesModalVisible(false)}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  infographic: {
    width: '100%',
    height: 700,
  },
  button: {
    backgroundColor: '#908cd6', // Color de fondo de los botones
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10, // Espacio entre botones
    marginBottom: 10, // Espacio inferior para evitar que toquen otros elementos
  },
  buttonText: {
    color: '#ffffff', // Color del texto del botón
    fontSize: 18,
  },
  videoSection: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  videoContainer: {
    marginBottom: -200, // Espacio entre videos
    alignItems: 'center',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5, // Espacio pequeño entre el título y el video
    textAlign: 'center',
  },
});

export default L1sociales;