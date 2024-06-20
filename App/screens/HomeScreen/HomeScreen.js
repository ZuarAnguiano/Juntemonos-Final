import { View, Text,  StyleSheet } from 'react-native'
import React from 'react'
import AppMapView from './MapView'

export default function InicioScreen() {
  return (
    <View style={styles.container}>
        <AppMapView/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});