import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import SwipeableItem from '../../../components/SwipeableItem'
import { useNavigation } from '@react-navigation/native';

export default function EventsProgress({ events, onDeleteEvent }) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.headerText}>En curso</Text>
            </View>
            <View style={styles.DataEvent}>
                <ScrollView>
                    {events && events.map((event, index) => (
                        <SwipeableItem key={index} onSwipeRight={() => onDeleteEvent(event.id)}>
                            <TouchableOpacity onPress={() => {navigation.navigate('DetailsEvent',  {id: event.id} )}}>
                                <Text style={styles.textEvents}>
                                    {event.name}
                                </Text>
                            </TouchableOpacity>
                        </SwipeableItem>
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 20,
        marginBottom: 10,
        justifyContent: 'center',
    },
    DataEvent: {
        borderWidth: 1,
        borderColor: "#000",
        height: 150
    },
    textEvents: {
        backgroundColor: '#fff',
        borderWidth: .5,
        borderBottomColor: '#000',
        paddingVertical: 10,
        paddingLeft: 5
    }
});
