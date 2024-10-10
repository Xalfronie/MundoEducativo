import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Signin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      // Restablecer el estado de showPassword a false cada vez que el componente se enfoque
      setShowPassword(false);
    }, [])
  );

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword || !userType) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      // Crear usuario en Firebase Auth
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      // Obtener el contador actual y actualizarlo
      const counterDoc = firestore().collection('metadata').doc('counters');
      await firestore().runTransaction(async (transaction) => {
        const doc = await transaction.get(counterDoc);
        if (!doc.exists) {
          // Si el documento no existe, inicializarlo
          transaction.set(counterDoc, { userCount: 0 });
          throw new Error('El documento de contador no existía, se ha inicializado. Por favor, intente de nuevo.');
        }

        const newCount = doc.data().userCount + 1;
        transaction.update(counterDoc, { userCount: newCount });

        // Crear el ID del usuario
        const formattedUserId = `UsuarioId${newCount}`;

        // Guardar información adicional en Firestore
        await firestore().collection('Usuario').doc(formattedUserId).set({
          id: formattedUserId,
          name,
          email,
          userType,
        });
      });

      Alert.alert('Éxito', 'Usuario registrado correctamente');
      
      // Redirigir al usuario a la pantalla de inicio de sesión
      

      // Limpiar los campos del formulario
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUserType('');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'El email ya está en uso');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showPassword}
      />
      <Text style={styles.label}>Tipo de Usuario</Text>
      <View style={styles.radioContainer}>
        <RadioButton.Group onValueChange={value => setUserType(value)} value={userType}>
          <View style={styles.radioButton}>
            <RadioButton value="estudiante" />
            <Text>Estudiante</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton value="padre" />
            <Text>Padre</Text>
          </View>
        </RadioButton.Group>
      </View>
      <Button title="Registrar" onPress={handleRegister} />
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
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Signin;