import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Drawer from 'react-native-drawer';
import FlipCard from 'react-native-flip-card';
import Sound from 'react-native-sound';

// Importa la imagen que deseas usar
import imagenActividades from '../../../assets/img/image.png'; // Reemplaza con la ruta correcta de tu imagen

const cardsData = [
  { id: 1, image: require('../../../assets/img/delfi.jpg'), matched: false },
  { id: 2, image: require('../../../assets/img/delfi.jpg'), matched: false },
  { id: 3, image: require('../../../assets/img/balli.jpg'), matched: false },
  { id: 4, image: require('../../../assets/img/balli.jpg'), matched: false },
  { id: 5, image: require('../../../assets/img/eri.jpg'), matched: false },
  { id: 6, image: require('../../../assets/img/eri.jpg'), matched: false },
];

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const SideBar = () => (
  <View style={styles.sidebar}>
    <View style={styles.imageContainer}>
      <Image source={imagenActividades} style={styles.sidebarImage} />
    </View>
    <Text style={styles.sidebarText}>Actividad 1</Text>
    <Text style={styles.sidebarText}>Actividad 2</Text>
    <Text style={styles.sidebarText}>Actividad 3</Text>
  </View>
);

const JuegoMemoriaL = () => {
  const [cards, setCards] = useState(shuffleArray([...cardsData]));
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isPreview, setIsPreview] = useState(true);

  useEffect(() => {
    const previewTimeout = setTimeout(() => {
      setIsPreview(false);
    }, 2000); // Muestra las cartas durante 2 segundos

    return () => clearTimeout(previewTimeout);
  }, []);

  const resetGame = () => {
    setCards(shuffleArray([...cardsData].map(card => ({ ...card, matched: false }))));
    setSelectedCards([]);
    setMatchedPairs(0);
    setIsPreview(true);

    setTimeout(() => {
      setIsPreview(false);
    }, 2000);
  };

  let drawer;

  const openDrawer = () => {
    drawer.open();
  };

  const handleCardFlip = (index) => {
    if (isPreview || selectedCards.length === 2 || selectedCards.includes(index)) {
      return;
    }

    const newSelectedCards = [...selectedCards, index];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      const [firstIndex, secondIndex] = newSelectedCards;
      if (cards[firstIndex].image === cards[secondIndex].image) {
        const newCards = [...cards];
        newCards[firstIndex].matched = true;
        newCards[secondIndex].matched = true;
        setCards(newCards);
        setMatchedPairs(matchedPairs + 1);
      }

      setTimeout(() => {
        setSelectedCards([]);
      }, 1000);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleCardFlip(index)} disabled={item.matched || selectedCards.includes(index)}>
      <FlipCard
        flip={selectedCards.includes(index) || item.matched || isPreview}
        clickable={false}
        style={styles.cardContainer}
      >
        <View style={styles.card}>
          <Text style={styles.cardText}>?</Text>
        </View>
        <View style={styles.card}>
          <Image source={item.image} style={styles.cardImage} />
        </View>
      </FlipCard>
    </TouchableOpacity>
  );

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

  return (
    <Drawer
      ref={(ref) => { drawer = ref; }}
      content={<SideBar />}
      type="overlay"
      tapToClose={true}
      openDrawerOffset={0.2}
      panCloseMask={0.2}
      closedDrawerOffset={-3}
      styles={drawerStyles}
      side="right"
      tweenHandler={(ratio) => ({
        main: { opacity: (2 - ratio) / 2 }
      })}>
      <View style={styles.container}>
        <Text style={styles.openDrawerText} onPress={openDrawer}>Progreso</Text>
        
        <View style={styles.containertxt}>
          <Text style={styles.textoinicio}>Selecciona la pareja de cada tarjeta para terminar el juego</Text>
        </View>
        
        <View style={styles.gameContainer}>
          <FlatList
            data={cards}
            renderItem={renderItem}
            numColumns={3}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContent}
          />
          <Text style={styles.scoreText}>Parejas encontradas: {matchedPairs}</Text>
          <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Reiniciar Juego</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.audioButtonContainer}>
          <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
            <Text style={styles.audioButtonText}>🔊</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#A3E1EF',
  },
  containertxt:{
    width:200,
    height:200,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:100,
    marginTop:-100,
  },
  textoinicio:{
    fontSize:20,
    textAlign:'center',
    color:'black',
  },
  gameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  openDrawerText: {
    position: 'absolute',
    top: 20,
    right: 20,
    color: 'black',
    fontSize: 18,
  },
  sidebar: {
    flex: 1,
    backgroundColor: '#A3E1EF',
    padding: 16,
    borderRadius: 20,
  },
  sidebarText: {
    fontSize: 18,
    marginVertical: 10,
    color: 'black',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sidebarImage: {
    width: 100,
    height: 100,
  },
  cardContainer: {
    margin: 10,
  },
  card: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardText: {
    fontSize: 32,
    color: '#333',
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  scoreText: {
    fontSize: 24,
    marginTop: 20,
    color: 'black',
  },
  flatListContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#57C1E6', // Color del botón
    borderRadius: 8,
  },
  resetButtonText: {
    fontSize: 18,
    color: 'white', // Color del texto
  },
  audioButtonContainer: {
    position: 'absolute',
    bottom: 30, // Ajusta esta distancia según sea necesario
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

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
  main: { paddingLeft: 3 },
};

export default JuegoMemoriaL;