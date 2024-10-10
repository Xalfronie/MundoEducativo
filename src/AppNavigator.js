import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import HomeScreen from './screens/HomeScreen';
import Sociales from './screens/menus/Sociales';
import Ciencias from './screens/menus/Ciencias';
import Matematica from './screens/menus/Matematica';
import Lenguaje from './screens/menus/Lenguaje';
import CienciasLecciones from './screens/menus_L_A/CienciasLecciones';
import CienciasActividades from './screens/menus_L_A/CienciasActividades';
import MatematicasLecciones from './screens/menus_L_A/MatematicasLecciones';
import MatematicasActividades from './screens/menus_L_A/MatematicasActividades';
import SocialesLecciones from './screens/menus_L_A/SocialesLecciones';
import SocialesActividades from './screens/menus_L_A/SocialesActividades';
import LenguajeLecciones from './screens/menus_L_A/LenguajeLecciones';
import LenguajeActividades from './screens/menus_L_A/LenguajeActividades';
import ActividadArrastrarSoLtarL from './screens/actividades_juegos/ActiArraSoL';
import JuegoMemoriaL from './screens/actividades_juegos/JuegoMemoriaL';
import ClasificacionPalabrasL from './screens/actividades_juegos/ClaPaL';
import ActividadArrastrarSoLtarM from './screens/actividades_juegos/ActiArraSoM';
import JuegoMemoriaM from './screens/actividades_juegos/JuegoMemoriaM';
import ClasificacionPalabrasM from './screens/actividades_juegos/ClaPaM';
import ActividadArrastrarSoLtarC from './screens/actividades_juegos/ActiArraSoC';
import JuegoMemoriaC from './screens/actividades_juegos/JuegoMemoriaC';
import ClasificacionPalabrasC from './screens/actividades_juegos/ClaPaC';
import ActividadArrastrarSoLtarS from './screens/actividades_juegos/ActiArraSoS';
import JuegoMemoriaS from './screens/actividades_juegos/JuegoMemoriaS';
import ClasificacionPalabrasS from './screens/actividades_juegos/ClaPaS';
import WordClassificationGame from './screens/actividades_juegos/WordClassificationGame';
import DrawingScreen from './screens/actividades_juegos/DrawingScreen';
import DibujosC from './screens/actividades_juegos/DibujosC';
import ColorearScreen from './screens/actividades_juegos/ColorearScreen';
import L1ciencia from './screens/Lciencia/L1ciencia';
import L1sociales from './screens/Lsociales/L1sociales';
import L1mate from './screens/LMate/L1mate';
import L1lenguaje from './screens/Llenguaje/L1lenguaje';
import Gifedu from './screens/Gifedu';
import Signin from './screens/Cuentas/Signin';
import Login from './screens/Cuentas/Login';
import ConfC from './screens/Cuentas/ConfC';
import Manual from './screens/Manual';

const Stack = createStackNavigator();

function AppNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Manejar el estado de usuario
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator>
      {user ? (
        // Si el usuario está autenticado, mostrar la pantalla principal
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Sociales" component={Sociales} />
          <Stack.Screen name="Ciencias" component={Ciencias} />
          <Stack.Screen name="Matematica" component={Matematica} />
          <Stack.Screen name="Lenguaje" component={Lenguaje} />
          <Stack.Screen name="CienciasLecciones" component={CienciasLecciones} />
          <Stack.Screen name="CienciasActividades" component={CienciasActividades} />
          <Stack.Screen name="MatematicasLecciones" component={MatematicasLecciones} />
          <Stack.Screen name="MatematicasActividades" component={MatematicasActividades} />
          <Stack.Screen name="SocialesLecciones" component={SocialesLecciones} />
          <Stack.Screen name="SocialesActividades" component={SocialesActividades} />
          <Stack.Screen name="LenguajeLecciones" component={LenguajeLecciones} />
          <Stack.Screen name="LenguajeActividades" component={LenguajeActividades} />
          <Stack.Screen name="ActividadArrastrarSoLtarL" component={ActividadArrastrarSoLtarL} />
          <Stack.Screen name="JuegoMemoriaL" component={JuegoMemoriaL} />
          <Stack.Screen name="ClasificacionPalabrasL" component={ClasificacionPalabrasL} />
          <Stack.Screen name="ActividadArrastrarSoLtarM" component={ActividadArrastrarSoLtarM} />
          <Stack.Screen name="JuegoMemoriaM" component={JuegoMemoriaM} />
          <Stack.Screen name="ClasificacionPalabrasM" component={ClasificacionPalabrasM} />
          <Stack.Screen name="ActividadArrastrarSoLtarC" component={ActividadArrastrarSoLtarC} />
          <Stack.Screen name="JuegoMemoriaC" component={JuegoMemoriaC} />
          <Stack.Screen name="ClasificacionPalabrasC" component={ClasificacionPalabrasC} />
          <Stack.Screen name="ActividadArrastrarSoLtarS" component={ActividadArrastrarSoLtarS} />
          <Stack.Screen name="JuegoMemoriaS" component={JuegoMemoriaS} />
          <Stack.Screen name="ClasificacionPalabrasS" component={ClasificacionPalabrasS} />
          <Stack.Screen name="WordClassificationGame" component={WordClassificationGame} />
          <Stack.Screen name="DrawingScreen" component={DrawingScreen} />
          <Stack.Screen name="DibujosC" component={DibujosC} />
          <Stack.Screen name="ColorearScreen" component={ColorearScreen} />
          <Stack.Screen name="L1ciencia" component={L1ciencia} />
          <Stack.Screen name="L1sociales" component={L1sociales} />
          <Stack.Screen name="L1mate" component={L1mate} />
          <Stack.Screen name="L1lenguaje" component={L1lenguaje} />
          <Stack.Screen name="Gifedu" component={Gifedu} />
          <Stack.Screen name="ConfC" component={ConfC} />
          <Stack.Screen name="Manual" component={Manual} />
        </>
      ) : (
        // Si el usuario no está autenticado, mostrar la pantalla de inicio de sesión
        <>
          <Stack.Screen name="Login" component={Login} options={{ title: 'Iniciar Sesion' }} />
          <Stack.Screen name="Signin" component={Signin} options={{ title: 'Registrarse' }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default AppNavigator;