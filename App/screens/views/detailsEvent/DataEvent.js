import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

export default function DataEvent({ event }) {
    return (
        <View style={styles.DataEvent}>
            <Text style={styles.headerText}>Datos del evento</Text>
            <ScrollView>
                <View>
                    <Text style={styles.textData}>
                        {event.description}
                    </Text>
                    <Text>
                        {`Intereses: ${event.interests} `}
                    </Text>
                    <Text>
                        {`Fecha y hora: ${event.date && event.date.seconds
                                ? new Date(event.date.seconds * 1000).toLocaleString()
                                : ''
                            }`}

                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    DataEvent: {
        borderWidth: 1,
        borderColor: "#000",
        backgroundColor: '#D3D3D3',
        padding: 10,
        marginBottom: 70,
        marginHorizontal: 10,
        height: 200,
        borderRadius: 10
    },
    headerText: {
        fontSize: 20,
        marginBottom: 10,
        justifyContent: 'center',
    },
    textData: {
        textAlign: 'center'
    },

})