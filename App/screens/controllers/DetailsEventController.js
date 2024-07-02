import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import DataEvent from '../views/detailsEvent/DataEvent';
import Reviews from '../views/detailsEvent/Reviews';
import EventUsers from '../views/detailsEvent/EventUser';
import { EventsModel } from '../models/EventsModel';
import { UsersModel } from '../models/UsersModel';
import UserContext from '../../context/AuthContext'
import { useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';


export default function DetailsEventController() {
    //useRoute se utiliza ya que al redireccionar(desde events) a esta pantalla se mando una variable {id}
    const route = useRoute();
    const { id } = route.params;
    const eventId = id;
    const { userId } = useContext(UserContext);
    const [event, setEvent] = useState([]);
    const rating = 0;
    const eventUsers = 200;
    const [typeUser, setTypeUser] = useState('');

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

    useEffect(() => {
        const fetchUserType = async () => {
            try {
                const userType = await UsersModel.checkUserType(userId); // Asegúrate de tener userId disponible aquí
                setTypeUser(userType);
            } catch (error) {
                console.error('Error fetching user type:', error);
            }
        };
        // Llama a la función para obtener el tipo de usuario cuando se monta el componente
        fetchUserType();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={styles.header}>{`Evento ${event.name}`}</Text>
                </View>

                <DataEvent event={event} />

                <Reviews rating={rating} />

                {typeUser === 'premium-empresarial' && (
                    <View style={styles.containerGraph}>
                        <Text style={styles.headerText}>Usuarios en el evento</Text>
                        <View style={styles.graph}>
                            <Entypo name="bar-graph" size={120} color="black" />
                        </View>
                    </View>
                )}

                {typeUser !== 'premium-empresarial' && (
                    <EventUsers eventUsers={eventUsers || 3} />
                )}
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
    containerGraph: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#000",
        padding: 10,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    graph: {

        justifyContent: 'center',
        alignItems: 'center'
    }
});
