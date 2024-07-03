import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useEffect} from 'react'

import { EventsModel } from '../models/EventsModel';
import { UsersModel } from '../models/UsersModel';
import EventsProgress from '../views/events/EventsProgress'
import EventHistory from '../views/events/EventHistory'
import UserContext from '../../context/AuthContext'

export default function EventsController({ navigation }) {
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(UserContext);
  const [events, setEvents] = useState([]);

  console.log(events)

  //Bucar todos los eventos de la bd, hacemos de uso de la clase "UsersModel"
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const userType = await UsersModel.checkUserType(userId);

        let unsubscribe;
        if (userType === 'freemium') {
          unsubscribe = EventsModel.listenToFreemiumEvents((events) => {
            setEvents(events);
            setLoading(false);
          });
        } else {
          unsubscribe = EventsModel.listenToEvents((events) => {
            setEvents(events);
            setLoading(false);
          });
        }

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  //Cuando se haga swipe y el usuario seleccione que "Si" en eliminar, se elimina el evento de events y de la bd
  const deleteEvent = async (eventId) => {
    const success = await EventsModel.deleteEvent(eventId);
    if (success) {
      setEvents(events.filter(event => event.id !== eventId));
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <EventsProgress events={events} onDeleteEvent={deleteEvent} />
      <EventHistory events={events} onDeleteEvent={deleteEvent} />
      <TouchableOpacity style={styles.floatingButton} onPress={() => {navigation.navigate('CreateEvent')}}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: "purple",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButtonText: {
    color: "white",
    fontSize: 30,
    textAlign: "center",

  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
},


});