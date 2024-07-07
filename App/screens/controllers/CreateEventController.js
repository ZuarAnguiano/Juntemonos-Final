import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Button, ScrollView, ActivityIndicator} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserLocationContext } from '../../context/UserLocationContext';
import { UsersModel } from '../models/UsersModel'
import { EventsModel } from '../models/EventsModel';
import EventForm from '../views/createEvent/FormEvent';
import EventMap from '../views/createEvent/EventMap';
import EventDatePicker from '../views/createEvent/EventDatePicker'
import Interest from '../views/createEvent/Interest';
import UserContext from '../../context/AuthContext'


export default function CreateEventController({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [textNameEvent, setTextNameEvent] = useState('');
    const [textDescription, setTextDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const { location } = useContext(UserLocationContext);
    const { userId } = useContext(UserContext);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [markerCoords, setMarkerCoords] = useState({
        latitude: location.latitude,
        longitude: location.longitude,
    });


    //Actualiza las coordenadas del marcador cuando se arrastra en el mapa.
    const handleMarkerDrag = (e) => {
        setMarkerCoords(e.nativeEvent.coordinate);
        console.log(markerCoords)
    };

    //Agrega los intereses seleccionados a interest 
    const handleInterestChange = (interest, isChecked) => {
        if (isChecked) {
            setSelectedInterests([...selectedInterests, interest]);
        } else {
            setSelectedInterests(selectedInterests.filter(item => item !== interest));
        }
    };


    //Solo imprime los intereses cada que se selecciona uno nuevo, se puede borrar, solo es para ver en la consola
    useEffect(() => {
        console.log("Intereses seleccionados: ", selectedInterests);
    }, [selectedInterests]);

    //Actualiza la fecha seleccionada y muestra/oculta los selectores(DateTimePicker) correspondientes.
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
        console.log(formatDate(currentDate));
    };

    //Actualiza la hora seleccionada y muestra/oculta los selectores(DateTimePicker) correspondientes.
    const onChangeTime = (event, selectedTime) => {
        const currentDate = selectedTime || date;
        setShowTimePicker(false);
        if (selectedTime) {
            const updatedDate = new Date(date);
            updatedDate.setHours(selectedTime.getHours());
            updatedDate.setMinutes(selectedTime.getMinutes());
            setDate(updatedDate);
            console.log(formatTime(updatedDate));
        }
    };

    //Muestra u oculta los selectores(DateTimePicker)  de fecha y hora.
    const showDatepicker = () => {
        setShowTimePicker(false);
        setShowDatePicker(!showDatePicker);
    };

    //Muestra u oculta los selectores(DateTimePicker)  de fecha y hora.
    const showTimepicker = () => {
        setShowDatePicker(false);
        setShowTimePicker(!showTimePicker);
    };

    //Formatear la fecha, es decir, mostrarlo legible
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    //Formatear la hora, es decir, mostrarlo legible
    const formatTime = (date) => {
        return date.toLocaleString('es-ES', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
    };


    //Validacion y guardado del evento usando el modelo EventsModel.
    const SaveEvent = async () => {
        if (textNameEvent === "") {
            alert("Por Favor Ingresa el Nombre del Evento");
            return;
        }
        try {
            setLoading(true);
            const userType = await UsersModel.checkUserType(userId);
            const eventLimit = await EventsModel.checkEventLimit(userId);

            if (userType === 'freemium' && eventLimit >= 2) {
                alert("Los usuarios freemium solo pueden crear hasta 2 eventos diarios . Por favor, actualiza a premium para crear más eventos.");
                return;
            }

            const newEvent = new EventsModel(
                textNameEvent,
                textDescription,
                date,
                markerCoords,
                selectedInterests,
                userId
            );

            const success = await EventsModel.saveEvent(newEvent);
            if (success) {
                navigation.navigate("Events");
                console.log('Event saved:', newEvent);
            } else {
                console.log('Failed to save event');
            }
        } catch (error) {
            console.error('Error saving event:', error);
        } finally {
            setLoading(false);
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
            <ScrollView style={styles.ContainerScroll}>

                <EventForm
                    textNameEvent={textNameEvent}
                    setTextNameEvent={setTextNameEvent}
                    textDescription={textDescription}
                    setTextDescription={setTextDescription}
                />
                <EventMap
                    markerCoords={markerCoords}
                    handleMarkerDrag={handleMarkerDrag}
                />

                <Interest
                    interests={selectedInterests}
                    handleInterestChange={handleInterestChange}
                />

                <EventDatePicker
                    date={date}
                    showDatepicker={showDatepicker}
                    showTimepicker={showTimepicker}
                    formatDate={formatDate}
                    formatTime={formatTime}
                />

                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="spinner"
                        onChange={onChangeDate}
                        minimumDate={new Date()}
                    />
                )}

                {showTimePicker && (
                    <DateTimePicker
                        value={date}
                        mode="time"
                        display="spinner"
                        onChange={onChangeTime}
                    />
                )}

                <View style={styles.button}>
                    <Button title='guardar' onPress={SaveEvent} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
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
    ContainerScroll: {
        paddingHorizontal: 40,
        paddingBottom: 5,
    },
    containerInput: {
        marginBottom: 30,
    },
    input: {
        padding: 5,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    dateText: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 20,
    },
    mapContainer: {
        width: '100%',
        height: 150,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 30,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputDate: {
        padding: 5,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        textAlign: 'center'
    },
    button: {
        marginTop: 30
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
