import { View, Text} from 'react-native'
import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

import AuthContext from '../../context/AuthContext'
import Login from '../views/login/Login'

export default function LoginController({ navigation }) {

  const { setUserId } = useContext(AuthContext); //función setUser del contexto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Inicio sesión exitosamente! \n', userCredential.user.uid);
      // Actualiza el estado del usuario en el contexto
      setUserId(userCredential.user.uid);
      // Reinicia la navegación para evitar que el usuario regrese a la pantalla de inicio de sesión
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'Tabs' }],
      });

      alert('Inicio sesión exitosamente, bienvenido!');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Correo o contraseña incorrectos!');
    }
  }

  return (
    <Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} login={login}/>
  )
}

