import React, { useState, useRef } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Image, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ColorPicker } from 'react-native-color-picker';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';

const ColorearScreen = () => {
  const [drawing, setDrawing] = useState(false);
  const [segments, setSegments] = useState([]);
  const [currentPath, setCurrentPath] = useState('');
  const [prevPoint, setPrevPoint] = useState(null);
  const [color, setColor] = useState('black');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const svgRef = useRef();

  // Configurar el archivo de audio
  const audioFile = new Sound('eligeundibujo.mp3', Sound.MAIN_BUNDLE, (error) => {
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

  const handleTouchStart = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    setPrevPoint({ x: locationX, y: locationY });
    setCurrentPath(`M${locationX},${locationY}`);
    setDrawing(true);
  };

  const handleTouchMove = (event) => {
    if (!drawing) return;
    const { locationX, locationY } = event.nativeEvent;
    const newPath = `${currentPath} L${locationX},${locationY}`;
    setCurrentPath(newPath);
    setPrevPoint({ x: locationX, y: locationY });
  };

  const handleTouchEnd = () => {
    setDrawing(false);
    if (currentPath) {
      setSegments([...segments, { path: currentPath, color, strokeWidth }]);
      setCurrentPath('');
    }
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setColorPickerVisible(false);
  };

  const handleStrokeWidthChange = (newWidth) => {
    setStrokeWidth(newWidth);
  };

  const handleClearDrawing = () => {
    setSegments([]);
  };

  const renderPaths = () => {
    return segments.map((segment, index) => (
      <Path key={index} d={segment.path} stroke={segment.color} strokeWidth={segment.strokeWidth} fill="none" />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.audioButtonContainer}>
        <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
          <Text style={styles.audioButtonText}>🔊</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.colorPickerContainer}>
        <TouchableOpacity onPress={() => setColorPickerVisible(!colorPickerVisible)}>
          <View style={[styles.colorPreview, { backgroundColor: color }]} />
        </TouchableOpacity>
        {colorPickerVisible && (
          <ColorPicker
            onColorSelected={handleColorChange}
            style={{ flex: 1, height: 200, width: 200 }}
            hideSliders={true}
            hideControls={true}
          />
        )}
      </View>
      <View style={styles.drawingContainer}>
        <Image
          source={require('../../../assets/img/flor.jpg')}
          style={styles.backgroundImage}
          resizeMode="contain"
        />
        <Svg
          width="100%"
          height="100%"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          ref={svgRef}
          style={styles.svg}
        >
          {renderPaths()}
          {currentPath && <Path d={currentPath} stroke={color} strokeWidth={strokeWidth} fill="none" />}
        </Svg>
      </View>
      <View style={styles.controls}>
        <View style={styles.widthButtons}>
          <Slider
            style={{ width: 200 }}
            minimumValue={1}
            maximumValue={10}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
            step={1}
            value={strokeWidth}
            onValueChange={handleStrokeWidthChange}
          />
        </View>
        <Button title="Borrar dibujo" onPress={handleClearDrawing} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  audioButtonContainer: {
    position: 'absolute',
    top: 2, // Ajusta esta distancia según sea necesario
    left: '93%',
    transform: [{ translateX: -25 }], // Ajusta el valor para centrar horizontalmente
  },
  audioButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 5,
  },
  audioButtonText: {
    fontSize: 20,
    color: '#000',
  },
  colorPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  colorPreview: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
  },
  drawingContainer: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  svg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  widthButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
  },
});

export default ColorearScreen;