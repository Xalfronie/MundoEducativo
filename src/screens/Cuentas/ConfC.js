import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ConfC = () => {
  const user = auth().currentUser;
  const [displayName, setDisplayName] = useState(user ? user.displayName : '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDocRef = firestore().collection('Usuario').where('email', '==', user.email);
          const snapshot = await userDocRef.get();
          
          if (!snapshot.empty) {
            const userData = snapshot.docs[0].data();
            setDisplayName(userData.name);
          } else {
            setError('El documento del usuario no se encuentra.');
          }
        } catch (error) {
          setError('Error al obtener los datos del usuario: ' + error.message);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      if (user) {
        await user.updateProfile({ displayName });

        const userDocRef = firestore().collection('Usuario').where('email', '==', user.email);
        const snapshot = await userDocRef.get();

        if (!snapshot.empty) {
          const userDoc = snapshot.docs[0].ref;
          await userDoc.update({ name: displayName });
          setSuccess('Nombre actualizado exitosamente');
        } else {
          setError('El documento del usuario no se encuentra.');
        }
      }
    } catch (error) {
      setError('Error al actualizar el nombre: ' + error.message);
      setSuccess('');
    }
  };

  const reauthenticate = async (currentPassword) => {
    const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);
    try {
      await user.reauthenticateWithCredential(credential);
    } catch (error) {
      setError('Error en la reautenticación: ' + error.message);
      setSuccess('');
      throw error;
    }
  };

  const handleUpdatePassword = async () => {
    try {
      if (user) {
        await reauthenticate(currentPassword);
        await user.updatePassword(newPassword);
        setSuccess('Contraseña actualizada exitosamente');
        setError('');
      }
    } catch (error) {
      setError('Error al actualizar la contraseña: ' + error.message);
      setSuccess('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modificar Datos del Usuario</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <Button title="Actualizar Nombre" onPress={handleUpdateProfile} />
      <TextInput
        style={styles.input}
        placeholder="Contraseña Actual"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Nueva Contraseña"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Button title="Actualizar Contraseña" onPress={handleUpdatePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  success: {
    color: 'green',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ConfC;
