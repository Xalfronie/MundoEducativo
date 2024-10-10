import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, PanResponder, Animated, Alert, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';

const imagesData = [
  { id: 1, name: 'manzana_roja', source: require('./img/lengua.png'), correctContainer: 'rojo' },
  { id: 2, name: 'uva_morada', source: require('./img/oreja.jpg'), correctContainer: 'morado' },
  { id: 3, name: 'platano_amarillo', source: require('./img/ojo.png'), correctContainer: 'amarillo' },
];

const DragAndDropActivity = () => {
  const [placedImages, setPlacedImages] = useState([]);
  const panValues = useState(imagesData.reduce((acc, image) => {
    acc[image.name] = new Animated.ValueXY();
    return acc;
  }, {}))[0];

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

  const dropZones = {
    rojo: { xMin: 0, xMax: 150, yMin: 300, yMax: 450 }, // Cuadro rojo
    morado: { xMin: 160, xMax: 310, yMin: 300, yMax: 450 }, // Cuadro morado
    amarillo: { xMin: 320, xMax: 470, yMin: 300, yMax: 450 }, // Cuadro amarillo
  };

  const checkDropZone = (gesture, currentImage) => {
    const { moveX, moveY } = gesture;

    const { correctContainer } = currentImage;
    const { xMin, xMax, yMin, yMax } = dropZones[correctContainer];

    // Verificar si la imagen está dentro del área del cuadro
    return moveX >= xMin && moveX <= xMax && moveY >= yMin && moveY <= yMax;
  };

  const createPanResponder = (image) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: panValues[image.name].x, dy: panValues[image.name].y }
      ], { useNativeDriver: false }),
      onPanResponderRelease: (event, gesture) => {
        const isInDropZone = checkDropZone(gesture, image);

        if (isInDropZone && !placedImages.includes(image.name)) {
          const updatedPlacedImages = [...placedImages, image.name];
          setPlacedImages(updatedPlacedImages);

          // Colocar la imagen en el centro del cuadro
          const dropZoneCenterX = (dropZones[image.correctContainer].xMin + dropZones[image.correctContainer].xMax) / 2 - 50;
          const dropZoneCenterY = (dropZones[image.correctContainer].yMin + dropZones[image.correctContainer].yMax) / 2 - 50;

          Animated.spring(panValues[image.name], {
            toValue: { x: dropZoneCenterX, y: dropZoneCenterY },
            friction: 5,
            useNativeDriver: false
          }).start();

          if (updatedPlacedImages.length === imagesData.length) {
            Alert.alert(
              "¡Felicidades!",
              "Has completado todas las imágenes.",
              [
                { text: "Volver a empezar", onPress: resetGame },
                { text: "Cerrar", onPress: () => {} }
              ]
            );
          }
        } else {
          // Regresar la imagen a su lugar inicial si no cae en la zona correcta
          Animated.spring(panValues[image.name], {
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
    Object.keys(panValues).forEach(key => {
      panValues[key].setValue({ x: 0, y: 0 });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arrastra las imágenes a su cuadro correspondiente</Text>
      <View style={styles.audioButtonContainer}>
        <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
          <Text style={styles.audioButtonText}>🔊</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dropZoneContainer}>
        <View style={[styles.dropZone, { backgroundColor: 'red' }]}>
          <Text style={styles.dropZoneText}>LENGUA</Text>
          {placedImages.includes('manzana_roja') && (
            <Image source={require('./img/lengua.png')} style={styles.placedImage} />
          )}
        </View>
        <View style={[styles.dropZone, { backgroundColor: 'green' }]}>
          <Text style={styles.dropZoneText}>OREJA</Text>
          {placedImages.includes('uva_morada') && (
            <Image source={require('./img/oreja.jpg')} style={styles.placedImage} />
          )}
        </View>
        <View style={[styles.dropZone, { backgroundColor: 'blue' }]}>
          <Text style={styles.dropZoneText}>OJO</Text>
          {placedImages.includes('platano_amarillo') && (
            <Image source={require('./img/ojo.png')} style={styles.placedImage} />
          )}
        </View>
      </View>

      <View style={styles.imageContainer}>
        {imagesData.map((image) => (
          !placedImages.includes(image.name) && (
            <Animated.View
              key={image.id}
              {...createPanResponder(image).panHandlers}
              style={[panValues[image.name].getLayout(), styles.draggableImageWrapper]}
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
    width: 150,  // 
    height: 150, // 
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
  dropZoneText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
    color: 'white',
  },
  audioButtonContainer: {
    position: 'absolute',
    top: 110,
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

export default DragAndDropActivity;