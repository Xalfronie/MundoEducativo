import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      // Restablecer el estado de showPassword a false cada vez que el componente se enfoque
      setShowPassword(false);
    }, [])
  );

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Éxito', 'Inicio de sesión correcto');
      setEmail(''); // Limpiar el campo de email
      setPassword(''); // Limpiar el campo de contraseña
      navigation.navigate('HomeScreen'); // Redirigir a HomeScreen
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'Usuario no encontrado');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Contraseña incorrecta');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  const handleNavigateToSignup = () => {
    setEmail(''); // Limpiar el campo de email
    setPassword(''); // Limpiar el campo de contraseña
    navigation.navigate('Signin'); // Redirigir a la pantalla de registro
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text>{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
        </TouchableOpacity>
      </View>
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <TouchableOpacity onPress={handleNavigateToSignup}>
        <Text style={styles.signupText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputPassword: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    flex: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showPasswordButton: {
    marginLeft: 10,
  },
  signupText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007BFF',
  },
});

export default Login;