import { View, Text, Button, StyleSheet, Platform } from 'react-native'
import React from 'react'

export default function Initiate({navigateToLR}) {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Bienvenidos</Text>
      <View style={styles.button}>
        <Button
          color={ Platform.OS === 'ios' ? '#fff' : '#d00281'}
          title="LOGIN"
          onPress={()=>{navigateToLR("Login")}}
        />
      </View>
      <View style={styles.button}>
        <Button
          color={ Platform.OS === 'ios' ? '#fff' : '#d00281'}
          title="REGISTRO"
          onPress={()=>{navigateToLR("Register")}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:"#fff"
    },
    textTitle: {
      fontSize: 20,
      fontWeight: 'Arial',
      color: '#808080',
  
    },
    button: {
      width: '80%',
      marginTop: 10,
      backgroundColor: '#d00281'
    }
  })