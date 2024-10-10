import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

// Importa los GIFs convertidos
const gifs = [
  { id: '1', source: require('../../assets/gifs/video.gif') },
  { id: '2', source: require('../../assets/gifs/video2.gif') },
  { id: '3', source: require('../../assets/gifs/video3.gif') },
  { id: '4', source: require('../../assets/gifs/video4.gif') },
  { id: '5', source: require('../../assets/gifs/video5.gif') },
  { id: '6', source: require('../../assets/gifs/video6.gif') },
  { id: '7', source: require('../../assets/gifs/video7.gif') },
  { id: '8', source: require('../../assets/gifs/video8.gif') },
];

const GifEdu = () => {
  const renderItem = ({ item }) => (
    <View style={styles.gifContainer}>
      <FastImage
        style={styles.gif}
        source={item.source}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={gifs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // 2 columnas
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A3E1EF',
  },
  listContainer: {
    paddingVertical: 10,
  },
  gifContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  gif: {
    width: Dimensions.get('window').width * 0.45,
    height: 150,
  },
});

export default GifEdu;