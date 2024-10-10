import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Sound from 'react-native-sound';

const WordClassificationGame = () => {
  const route = useRoute();
  const { subject } = route.params;
  const navigation = useNavigation();

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [words, setWords] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const wordData = {
      Sociales: [
        { word: "Presidente", category: "Gobierno" },
        { word: "Ciudad", category: "Geografía" },
        { word: "Democracia", category: "Gobierno" },
        { word: "Montaña", category: "Geografía" },
        { word: "Constitución", category: "Gobierno" },
        { word: "Río", category: "Geografía" },
        { word: "Senado", category: "Gobierno" },
        { word: "Isla", category: "Geografía" },
        { word: "Elecciones", category: "Gobierno" },
        { word: "Desierto", category: "Geografía" },
      ],
      Ciencias: [
        { word: "Célula", category: "Biología" },
        { word: "Planeta", category: "Astronomía" },
        { word: "Gen", category: "Biología" },
        { word: "Galaxia", category: "Astronomía" },
        { word: "Ecosistema", category: "Biología" },
        { word: "Estrella", category: "Astronomía" },
        { word: "Evolución", category: "Biología" },
        { word: "Cometa", category: "Astronomía" },
        { word: "Biodiversidad", category: "Biología" },
        { word: "Meteorito", category: "Astronomía" },
      ],
      Matematica: [
        { word: "Suma", category: "Operaciones" },
        { word: "Ángulo", category: "Geometría" },
        { word: "Resta", category: "Operaciones" },
        { word: "Círculo", category: "Geometría" },
        { word: "Multiplicación", category: "Operaciones" },
        { word: "Triángulo", category: "Geometría" },
        { word: "División", category: "Operaciones" },
        { word: "Cuadrado", category: "Geometría" },
        { word: "Exponente", category: "Operaciones" },
        { word: "Rectángulo", category: "Geometría" },
      ],
      Lenguaje: [
        { word: "Verbo", category: "Gramática" },
        { word: "Adjetivo", category: "Gramática" },
        { word: "Sustantivo", category: "Gramática" },
        { word: "Pronombre", category: "Gramática" },
        { word: "Adverbio", category: "Gramática" },
        { word: "Preposición", category: "Gramática" },
        { word: "Conjunción", category: "Gramática" },
        { word: "Interjección", category: "Gramática" },
        { word: "Artículo", category: "Gramática" },
        { word: "Determinante", category: "Gramática" },
        { word: "Metáfora", category: "Literatura" },
        { word: "Simil", category: "Literatura" },
        { word: "Personificación", category: "Literatura" },
        { word: "Hipérbole", category: "Literatura" },
        { word: "Aliteración", category: "Literatura" },
        { word: "Onomatopeya", category: "Literatura" },
        { word: "Anáfora", category: "Literatura" },
        { word: "Epíteto", category: "Literatura" },
        { word: "Eufemismo", category: "Literatura" },
        { word: "Ironía", category: "Literatura" },
      ],
    };

    setWords(wordData[subject]);
    setCurrentWordIndex(0);
    setSelectedCategory(null);
    setFeedback(null);
    setScore({ correct: 0, incorrect: 0 });
    setGameOver(false);
  }, [subject]);

  const handleSelectCategory = (category) => {
    if (selectedCategory === category || feedback !== null) return;

    const currentWord = words[currentWordIndex];
    setSelectedCategory(category);

    if (currentWord.category === category) {
      setFeedback({ message: "¡Correcto!", color: "#7CFC00" }); 
      setScore((prevScore) => ({ ...prevScore, correct: prevScore.correct + 1 }));
    } else {
      setFeedback({ message: "Incorrecto", color: "#FFC0CB" });
      setScore((prevScore) => ({ ...prevScore, incorrect: prevScore.incorrect + 1 }));
    }
  };

  const handleNextWord = () => {
    if (!selectedCategory) return; // Solo avanzar si se seleccionó una categoría

    setSelectedCategory(null);
    setFeedback(null);

    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setFeedback(`Puntuación final: Correctas: ${score.correct}, Incorrectas: ${score.incorrect}`);
      setGameOver(true);
    }
  };

  const handleBackToMenu = () => {
    navigation.navigate("Home"); // Navegar de vuelta al menú principal
  };

  const getRandomCategories = () => {
    if (words.length === 0 || currentWordIndex >= words.length) return [];
    
    const currentWord = words[currentWordIndex];
    const allCategories = [...new Set(words.map((word) => word.category))];
    let randomCategories = allCategories.filter(category => category !== currentWord.category);
    randomCategories = shuffleArray(randomCategories).slice(0, 1);
    randomCategories.push(currentWord.category);
    return shuffleArray(randomCategories);
  };

  // Función para mezclar un array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const categoriesToShow = getRandomCategories();

  // Configurar el archivo de audio
  const audioFile = new Sound('clasificapalabras.mp3', Sound.MAIN_BUNDLE, (error) => {
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
    <View style={styles.container}>
      <Text style={styles.title}>Clasificación de Palabras: {subject}</Text>
      <Text style={styles.instructions}>Selecciona la categoría correcta para cada palabra</Text>
      <View style={styles.wordContainer}>
        <Text style={styles.word}>{words[currentWordIndex]?.word}</Text>
        {feedback && <Text style={[styles.feedback, { color: feedback.color, textShadowColor: 'black', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 }]}>{feedback.message}</Text>}
      </View>
      <View style={styles.categoriesContainer}>
        {categoriesToShow.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => handleSelectCategory(category)}
            disabled={feedback !== null || selectedCategory !== null}
          >
            <Text style={styles.categoryButtonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {gameOver && (
      <View>
        <Text style={styles.finalScore}>{feedback}</Text>
        <TouchableOpacity style={styles.menuButton} onPress={handleBackToMenu}>
          <Text style={styles.menuButtonText}>Volver al Menú</Text>
        </TouchableOpacity>
      </View>
      )}
      {!gameOver && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNextWord}>
          <Text style={styles.nextButtonText}>Siguiente</Text>
        </TouchableOpacity>
      )}
      <View style={styles.audioButtonContainer}>
        <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
          <Text style={styles.audioButtonText}>🔊</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#A3E1EF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    color: "#000",
    marginBottom: 10,
  },
  wordContainer: {
    flexDirection: "column",
    alignItems: "center",
    color: "#000",
    marginBottom: 20,
  },
  word: {
    fontSize: 20,
    marginBottom: 10,
    color: "#000",
    textAlign: "center",
  },
  feedback: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#E6DCF8",
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: "#57C1E6",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  selectedCategoryButton: {
    backgroundColor: "#0056b3",
  },
  categoryButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: "#57C1E6",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  nextButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  menuButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  menuButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  finalScore: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 20,
  },
  audioButtonContainer: {
    position: 'absolute',
    bottom: 190, // Ajusta esta distancia según sea necesario
    left: '54%',
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

export default WordClassificationGame;