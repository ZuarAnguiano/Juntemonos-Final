import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function EventHistory({ events, onDeleteEvent }) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.headerText}>Historial</Text>
            </View>
            <View style={styles.section}>
                <ScrollView >
                    {events && events.map((event, index) => (
                        <SwipeableItem key={index} onSwipeRight={() => onDeleteEvent(event.id)}>
                            <TouchableOpacity onPress={() => {navigation.navigate('DetailsEvent',  {id: event.id} )}}>
                                <View style={styles.eventItem}>
                                    <Text>{event.name}</Text>
                                    <Text>{event.date.seconds ? new Date(event.date.seconds * 1000).toLocaleDateString() : ''}</Text>
                                </View>
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
    section: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
        marginBottom: 80,
        flex: 1
    },
    headerText: {
        fontSize: 20,
        justifyContent: 'center',
        marginBottom: 10,
    },
    eventItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: "#fff"
    }
})