import React, { useState } from 'react';
import { Alert, ActivityIndicator, View, StyleSheet  } from 'react-native';
import { UsersModel } from '../models/UsersModel';
import ForgotPass from '../views/forgetPass/ForgetPass';


export default function ForgotPasswordController({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (email === '') {
        console.log("no hay correo")
      Alert.alert('Error', 'Por favor, ingresa tu correo electrónico');
      return;
    }
    setLoading(true);
    try {
      await UsersModel.resetPassword(email);
      Alert.alert('Éxito', 'Correo de restablecimiento de contraseña enviado');
      setLoading(false);
      navigation.goBack(); 
    } catch (error) {
      console.error('Error al enviar correo de restablecimiento:', error);
      Alert.alert('Error', 'No se pudo enviar el correo de restablecimiento');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ForgotPass
      email={email}
      setEmail={setEmail}
      handleResetPassword={handleResetPassword}
    />
  );
}


const styles = StyleSheet.create({
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
},
})