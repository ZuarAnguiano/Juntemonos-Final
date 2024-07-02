import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function EventUsers({eventUsers}) {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Usuarios en el evento</Text>
            <Text style={styles.headerText}>{`n°   ${eventUsers} `}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#000",
        padding: 10,
        marginBottom: 10,
        paddingHorizontal: 20
    },
    headerText: {
        fontSize: 20,
        marginBottom: 10,
        justifyContent: 'center',
    },
})