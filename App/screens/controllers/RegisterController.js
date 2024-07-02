import { Alert, StyleSheet, View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UsersModel } from '../models/UsersModel';
import FormRegister from '../views/register/FormRegister'
import ButtonsFreePremium from '../views/register/ButtonsFreePrem'

export default function RegisterController({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [name, setName] = useState('');
  const [typeUser, setTypeUser] = useState('freemium');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  console.log(date)

  //Funcion para registrar el usuario utilizando el metodo del modelo.
  async function handleRegister() {
    try {
      if (password.length < 6) {
        Alert.alert('La contraseña debe tener al menos 6 caracteres.');
        return;
      } else if (repeatPassword != password) {
        Alert.alert('Las contraseñas deben ser iguales');
        return;
      }

      const age = calculateAge(date);
      if (age < 18) {
        Alert.alert('Debes ser mayor de 18 años para registrarte.');
        return;
      }

      const newUser = new UsersModel(email, password, name, date, typeUser, age);
      const user = await UsersModel.register(newUser);

      if (user) {
        Alert.alert('Registro exitoso', 'Tu cuenta ha sido creada exitosamente.');
        navigation.navigate('Login');
        console.log('Usuario registrado:', newUser);
      } else {
        console.log('Failed to save user');
      }
    } catch (error) {
      if (error.message === 'El correo electrónico ya está registrado.') {
        Alert.alert('Error de registro', 'El correo electrónico ya está en uso. Por favor, utiliza otro correo.');
      } else {
        console.error('Error al registrar el usuario:', error.message);
        Alert.alert('Error de registro', 'Hubo un error al intentar registrar tu cuenta. Por favor, inténtalo de nuevo.');
      }
    }
  }

  //Mostrar el datePicker
  const showDatepicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  //Seleccionar y cambiar fecha
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    const age = calculateAge(currentDate);
    if (age < 18) {
      Alert.alert('Debes ser mayor de 18 años para registrarte.');
    } else {
      setDate(currentDate);
      console.log(currentDate);
      console.log(formatDate(currentDate));
    }
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };


  //Formatear la fecha, es decir, mostrarlo legible
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <FormRegister
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          repeatPassword={repeatPassword}
          setRepeatPassword={setRepeatPassword}
          name={name}
          setName={setName}
          handleRegister={handleRegister}
          navigation={navigation}
          onShowDatepicker={showDatepicker}
          formatDate={formatDate}
          date={date} />

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={onChangeDate}
            maximumDate={new Date()}
          />
        )}

        <ButtonsFreePremium onSetTypeUser={setTypeUser} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 10,
},
})