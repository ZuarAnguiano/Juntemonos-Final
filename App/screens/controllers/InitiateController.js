import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import Initiate from '../views/initiate/Initiate'

export default function InitiateController({ navigation }) {

  function navigateToLR(nav) {
    if (nav == "Login") {
      navigation.navigate("Login")
    } else {
      navigation.navigate("Register")
    }

  }

  return (
    <Initiate navigateToLR={navigateToLR} />
  )
}

