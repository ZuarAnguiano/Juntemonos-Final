import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'

export default function FormEvent({ textNameEvent, setTextNameEvent, textDescription, setTextDescription }) {
    return (
        <View style={styles.containerInput}>
            <TextInput
                style={styles.input}
                value={textNameEvent}
                onChangeText={setTextNameEvent}
                placeholder="Nombre del evento"
                placeholderTextColor="#ccc"
            />
            <TextInput
                style={styles.input}
                value={textDescription}
                onChangeText={setTextDescription}
                placeholder="Descripción del evento"
                placeholderTextColor="#ccc"
            />
        </View>
    )
}


const styles = StyleSheet.create({
    containerInput: {
        marginBottom: 30,
    },
    input: {
        padding: 5,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
})