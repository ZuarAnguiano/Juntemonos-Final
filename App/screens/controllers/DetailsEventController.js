import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import DataEvent from '../views/detailsEvent/DataEvent';
import Reviews from '../views/detailsEvent/Reviews';
import EventUsers from '../views/detailsEvent/EventUser';
import { EventsModel } from '../models/EventsModel';
import { useRoute } from '@react-navigation/native';


export default function DetailsEventController() {
    //useRoute se utiliza ya que al redireccionar(desde events) a esta pantalla se mando una variable {id}
    const route = useRoute();
    const { id } = route.params;
    const eventId = id;
    const [event, setEvent] = useState([]);
    const rating = 0;
    const eventUsers = 200;

    //Buscar el evento con el id recuperado anteriormente, hacemo uso de la clase "EventsModel"
  useEffect(() => {
    const fetchEventById = async () => {
        try {
            const unsubscribe = await EventsModel.getEventById(eventId, (eventData) => {
                setEvent(eventData); // Actualizamos el estado del usuario con los datos recibidos
            });
            return () => unsubscribe();
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };
    fetchEventById();
  }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={styles.header}>{`Evento ${event.name}`}</Text>
                </View>

                <DataEvent event={event} />

                <Reviews rating={rating} />

                <EventUsers eventUsers={eventUsers} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        justifyContent: 'center',
    },
});
