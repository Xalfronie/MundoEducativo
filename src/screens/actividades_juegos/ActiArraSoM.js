import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, PanResponder, Animated, Alert, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';

const imagesData = [
  { id: 1, name: 'manzana_roja', source: require('./img/red.png'), correctContainer: 'rojo' },
  { id: 2, name: 'uva_morada', source: require('./img/green.jpg'), correctContainer: 'morado' },
  { id: 3, name: 'platano_amarillo', source: require('./img/blue.jpg'), correctContainer: 'amarillo' },
];

const DragAndDropActivity = () => {
  const [placedImages, setPlacedImages] = useState([]);
  const pan = useState(new Animated.ValueXY())[0];

  // Configurar el archivo de audio
  const audioFile = new Sound('recuerdaarrastrar.mp3', Sound.MAIN_BUNDLE, (error) => {
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

  const checkDropZone = (gesture, currentImage) => {
    const { moveX, moveY } = gesture;

    const dropZones = {
      rojo: { xMin: 50, xMax: 150, yMin: 300, yMax: 400 },
      morado: { xMin: 170, xMax: 270, yMin: 300, yMax: 400 },
      amarillo: { xMin: 290, xMax: 390, yMin: 300, yMax: 400 },
    };

    const { correctContainer } = currentImage;
    const { xMin, xMax, yMin, yMax } = dropZones[correctContainer];

    return moveX > xMin && moveX < xMax && moveY > yMin && moveY < yMax;
  };

  const createPanResponder = (image) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: pan.x, dy: pan.y }
      ], { useNativeDriver: false }),
      onPanResponderRelease: (event, gesture) => {
        if (checkDropZone(gesture, image)) {
          const updatedPlacedImages = [...placedImages];
          updatedPlacedImages.push(image.name);
          setPlacedImages(updatedPlacedImages);
          pan.setValue({ x: 0, y: 0 }); // Reset position

          if (updatedPlacedImages.length === imagesData.length) {
            Alert.alert(
              "¡Felicidades!",
              "Has completado todas las imágenes.",
              [
                { text: "Volver a empezar", onPress: resetGame },
                { text: "Cerrar", onPress: () => {} }  // Simplemente cierra el mensaje
              ]
            );
          }
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false
          }).start();
        }
      }
    });
  };

  const resetGame = () => {
    setPlacedImages([]);
    pan.setValue({ x: 0, y: 0 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arrastra las imagenes a su color correspondiente</Text>
      <View style={styles.audioButtonContainer}>
        <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
          <Text style={styles.audioButtonText}>🔊</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dropZoneContainer}>
        <View style={[styles.dropZone, { backgroundColor: 'red' }]}>
          {placedImages.includes('manzana_roja') && (
            <Image source={require('./img/red.png')} style={styles.placedImage} />
          )}
        </View>
        <View style={[styles.dropZone, { backgroundColor: 'green' }]}>
          {placedImages.includes('uva_morada') && (
            <Image source={require('./img/green.jpg')} style={styles.placedImage} />
          )}
        </View>
        <View style={[styles.dropZone, { backgroundColor: 'blue' }]}>
          {placedImages.includes('platano_amarillo') && (
            <Image source={require('./img/blue.jpg')} style={styles.placedImage} />
          )}
        </View>
      </View>
      <View style={styles.imageContainer}>
        {imagesData.map((image) => (
          !placedImages.includes(image.name) && (
            <Animated.View
              key={image.id}
              {...createPanResponder(image).panHandlers}
              style={[pan.getLayout(), styles.draggableImageWrapper]}
            >
              <Image source={image.source} style={styles.draggableImage} />
            </Animated.View>
          )
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropZoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dropZone: {
    width: 100,
    height: 100,
    borderWidth: 1,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  placedImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  draggableImageWrapper: {
    position: 'absolute',
    width: 100,
    height: 100,
  },
  draggableImage: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 20,
  },
  audioButtonContainer: {
    position: 'absolute',
    top: 110, // Ajusta esta distancia según sea necesario
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

export default DragAndDropActivity;