import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

// Asegúrate de importar las imágenes correctamente desde tu carpeta de assets
const image1 = require('../../../assets/img/Cuento.png');
const image2 = require('../../../assets/img/Fabula.png');

const videos = [
  { id: "AtWTCY2e1WE", title: "Video Educativo Cuentos y Fábulas" },
  // Agrega más videos con sus títulos aquí
];

const L1lenguaje = () => {
  const [playing, setPlaying] = useState({});

  const onStateChange = useCallback((state, videoId) => {
    if (state === 'ended') {
      setPlaying(prev => ({ ...prev, [videoId]: false }));
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cuentos y Fabulas</Text>
      
      <View style={styles.imageContainer}>
        {/* Puedes agregar imágenes aquí si es necesario */}
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>¿Qué es un cuento?</Text>
        <Text style={styles.text1}>Un cuento es una narración breve, escrita o hablada, que cuenta una historia con personajes y eventos, generalmente con una estructura simple y un enfoque en un solo tema o conflicto. Los cuentos pueden variar en longitud, pero suelen ser más cortos que las novelas. Están diseñados para entretener, educar o transmitir un mensaje moral.</Text>
        <Text style={styles.text}>Ejemplo de un cuento</Text>
        <Text style={styles.text1}>El Ratón y el León:

Había una vez un pequeño ratón que vivía en un agujero en el suelo de un gran bosque. Un día, mientras corría por el campo, se encontró con un enorme león dormido bajo un árbol. El ratón, curioso, se acercó para mirarlo de cerca.

De repente, el león se despertó y, al ver al ratón cerca, se enfureció. Con un rugido poderoso, el león atrapó al ratón con su gran pata y dijo:

— ¿Qué haces aquí, diminuto ratón? ¿Acaso no sabes que este es mi territorio?

El ratón, temblando de miedo, respondió:

— Lo siento mucho, señor León. No quise molestar. Por favor, déjame ir y te prometo que no volveré a molestarte.

El león, sorprendido por la valentía y humildad del ratón, decidió soltarlo. Dijo:

— Está bien, te dejaré ir esta vez. Pero si alguna vez vuelves a molestarme, no seré tan amable.

El ratón agradeció y se alejó rápidamente.

Pocos días después, el león quedó atrapado en una red de cazadores. Intentó liberarse, pero la red estaba muy fuerte. El león rugía desesperado, pero nadie venía en su ayuda. 

De repente, el pequeño ratón apareció. Recordando la bondad del león, decidió ayudar. Se acercó a la red y comenzó a roer las cuerdas con sus pequeños dientes afilados. Trabajó con rapidez y determinación hasta que, finalmente, logró romper la red y liberar al león.

El león, ahora libre, se volvió hacia el ratón y dijo:

— ¡Nunca pensé que alguien tan pequeño como tú podría ayudarme tanto! Gracias, pequeño amigo. 

Desde aquel día, el león y el ratón se convirtieron en grandes amigos. El león aprendió que incluso los más pequeños pueden ser de gran ayuda, y el ratón aprendió que la bondad siempre regresa.

Moral:
La bondad nunca es en vano y todos, sin importar su tamaño, tienen algo que ofrecer.</Text>
        <Image source={image1} style={styles.image} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>¿Qué es una Fabula?</Text>
        <Text style={styles.text1}>Una fábula es un tipo de relato breve que tiene una enseñanza o moraleja al final. Las fábulas suelen ser historias protagonizadas por animales que hablan y actúan como seres humanos. A través de estas historias, se transmiten lecciones sobre comportamientos, valores y sabiduría moral.</Text>
        <Text style={styles.text}>Ejemplo de Fabula</Text>
        <Text style={styles.text1}>La Cigarra y la Hormiga
Historia: Durante el verano, una cigarra canta alegremente y disfruta del sol. Mientras tanto, una hormiga trabaja arduamente, recogiendo comida y almacenándola para el invierno. La cigarra se burla de la hormiga, diciendo que debería disfrutar del verano en lugar de trabajar tanto.

Cuando llega el invierno, la cigarra está hambrienta y sin refugio. Va a la casa de la hormiga y le pide comida. La hormiga le responde:

— ¿Por qué no trabajaste y te preparaste para el invierno como yo te sugerí?

La cigarra, arrepentida, le dice:

— Yo disfruté del verano y no pensé en el futuro. Ahora entiendo la importancia de prepararse.

Moraleja: Es importante trabajar y prepararse para el futuro en lugar de solo disfrutar del presente.</Text>
        <Image source={image2} style={styles.image} />
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

export default L1lenguaje;