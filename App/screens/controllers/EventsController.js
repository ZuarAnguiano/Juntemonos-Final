import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect} from 'react'

import { EventsModel } from '../models/EventsModel';
import { UsersModel } from '../models/UsersModel';
import EventsProgress from '../views/events/EventsProgress'
import EventHistory from '../views/events/EventHistory'
import UserContext from '../../context/AuthContext'

export default function EventsController({ navigation }) {
  const { userId } = useContext(UserContext);
  const [UserEvents, setUserEvents] = useState([]);
  const [events, setEvents] = useState([]);

  console.log(events)

  //Bucar todos los eventos de la bd, hacemos de uso de la clase "UsersModel"
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userType = await UsersModel.checkUserType(userId);

        let unsubscribe;
        unsubscribe = EventsModel.listenToEvents((events) => {
          setEvents(events);
        });
        /*if (userType === 'freemium') {
          unsubscribe = EventsModel.listenToFreemiumEvents((events) => {
            setEvents(events);
          });
        } else {
          unsubscribe = EventsModel.listenToEvents((events) => {
            setEvents(events);
          });
        }*/

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  //Eventos del historial (solo eventos del usuario)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let unsubscribe = EventsModel.getUserEvents(userId, (events) => {
          setUserEvents(events);
        });
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

  return (
    <View style={styles.container}>
      <EventsProgress events={events} onDeleteEvent={deleteEvent} />
      <EventHistory events={UserEvents} onDeleteEvent={deleteEvent} />
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


});