import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Modal, Animated, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import Sound from "react-native-sound";
import FastImage from 'react-native-fast-image';

// Configurar la ruta de los archivos de audio
const voiceGuide = {
  mainScreen: new Sound('vozmenu.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  }),
  admincuenta: new Sound('admincuenta.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  }),
  notificaciones: new Sound('notificaciones.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  }),
  cuentasconectadas: new Sound('cuentasconectadas.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  }),
  nuevacuenta: new Sound('nuevacuenta.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  }),
  cerrarsesion: new Sound('cerrarsesion.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  }),
};

const playVoiceGuide = (audio) => {
  audio.play((success) => {
    if (!success) {
      console.log('Sound playback failed');
    }
  });
};

const Home = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  
  const handleLogout = async () => {
    try {
      await auth().signOut();
      
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const backgroundImage = require('../../assets/img/Fondo.png');
  const buttonImages = [
    require('../../assets/img/1.png'),
    require('../../assets/img/2.png'),
    require('../../assets/img/3.png'),
    require('../../assets/img/4.png'),
    require('../../assets/img/arte.png'),
    require('../../assets/img/balle.gif'),
    require('../../assets/img/manual.png'), // Asegúrate de que esta ruta sea correcta
  ];
  const logoImage = require('../../assets/img/Logo.png');

  const navigateToScreen = (screenName) => {
    closeModal(); // Cerrar el modal antes de navegar
    navigation.navigate(screenName);
  };

  const openModal = () => {
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 100,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.logoContainer}>
            <FastImage source={logoImage} style={styles.logo} />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigateToScreen("Sociales")}>
              <FastImage source={buttonImages[0]} style={styles.buttonImage} />
            </TouchableOpacity>
            <View style={styles.space} />
            <TouchableOpacity style={styles.button} onPress={() => navigateToScreen("Ciencias")}>
              <FastImage source={buttonImages[1]} style={styles.buttonImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigateToScreen("Matematica")}>
              <FastImage source={buttonImages[2]} style={styles.buttonImage} />
            </TouchableOpacity>
            <View style={styles.space} />
            <TouchableOpacity style={styles.button} onPress={() => navigateToScreen("Lenguaje")}>
              <FastImage source={buttonImages[3]} style={styles.buttonImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsContainer2}>
            <TouchableOpacity style={styles.button} onPress={() => navigateToScreen("DibujosC")}>
              <FastImage source={buttonImages[4]} style={styles.buttonImage} />
            </TouchableOpacity>
            <View style={styles.space} />
            <TouchableOpacity style={styles.button} onPress={() => navigateToScreen("Gifedu")}> 
              <FastImage source={buttonImages[5]} style={styles.buttonImage} />
            </TouchableOpacity>
          </View>
         
          <View style={styles.voiceButtonContainer}>
            <TouchableOpacity style={styles.voiceButton} onPress={() => playVoiceGuide(voiceGuide.mainScreen)}>
              <Text style={styles.voiceButtonText}>🔊</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.tab} onPress={openModal}>
          <Text style={styles.tabText}>≡</Text>
        </TouchableOpacity>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <Animated.View style={[styles.modalContent, { opacity, transform: [{ translateY }] }]}>
              <Text style={styles.accountText}>Configuración</Text>
              <View style={styles.modalItemContainer}>
                <Text style={styles.modalItem} onPress={() => navigateToScreen("ConfC")}>Administración de cuenta</Text>
                <TouchableOpacity onPress={() => playVoiceGuide(voiceGuide.admincuenta)}>
                  <Text style={styles.audioButton}>🔊</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalItemContainer}>
                <Text style={styles.modalItem} onPress={() => { /* Navegar a Notificaciones */ }}>Notificaciones</Text>
                <TouchableOpacity onPress={() => playVoiceGuide(voiceGuide.notificaciones)}>
                  <Text style={styles.audioButton}>🔊</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalItemContainer}>
                <Text style={styles.modalItem} onPress={() => { /* Navegar a Cuentas conectadas */ }}>Cuentas conectadas</Text>
                <TouchableOpacity onPress={() => playVoiceGuide(voiceGuide.cuentasconectadas)}>
                  <Text style={styles.audioButton}>🔊</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalItemContainer}>
                <Text style={styles.modalItem} onPress={() => { /* Navegar a Agregar cuenta */ }}>Agregar cuenta</Text>
                <TouchableOpacity onPress={() => playVoiceGuide(voiceGuide.nuevacuenta)}>
                  <Text style={styles.audioButton}>🔊</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalItemContainer}>
                <Text style={styles.modalItem} onPress={handleLogout}>Cerrar sesión</Text>
                <TouchableOpacity onPress={() => playVoiceGuide(voiceGuide.cerrarsesion)}>
                  <Text style={styles.audioButton}>🔊</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalItemContainer}>
                <Text style={styles.modalItem} onPress={() => navigateToScreen("Gifedu")}>Manual</Text>
                <TouchableOpacity onPress={() => navigateToScreen("Manual")}>
                  <Text style={styles.modalItem}>Ir al Manual</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>Cerrar</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
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
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20, // Añadir padding vertical para permitir el desplazamiento
  },
  logoContainer: {
    position: 'absolute',
    top: -30,
    left: '50%',
    transform: [{ translateX: -100 }],
  },
  logo: {
    width: 250,
    height: 250,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
    marginTop: 5, // Reducir el margen superior
    top: 10, // Reducir la posición superior
    padding: 5, // Agregar un poco de padding para reducir el contenido
    height: 150, // Ajustar la altura según sea necesario
  },
  buttonsContainer2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
    marginTop: 10, // Reducir el margen superior
    top: 30, // Reducir la posición superior
    padding: 5, // Agregar un poco de padding para reducir el contenido
    height: 100, // Ajustar la altura según sea necesario
    width: 50,
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
    width: 10,
  },
  tab: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 50,
  },
  tabText: {
    color: '#fff',
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 250,
    backgroundColor: '#A3E1EF',
    padding: 20,
    borderRadius: 10,
    marginTop: 50,
    marginRight: 20,
  },
  modalItemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalItem: {
    fontSize: 18,
    flex: 1,
  },
  audioButton: {
    fontSize: 24,
    color: '#000',
    marginLeft: 10,
  },
  closeButton: {
    marginTop: 20,
    color: 'blue',
  },
  accountText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  voiceButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 5,
  },
  voiceButtonText: {
    fontSize: 24,
  },
});

export default Home;