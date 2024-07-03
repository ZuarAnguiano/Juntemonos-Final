import React, { useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import ImgProfile from '../views/detailsUser/ImageProfile'
import Intereses from '../views/detailsUser/Interest'
import EventHistory from '../views/detailsUser/EventHistory';
import { EventsModel } from '../models/EventsModel';
import { UsersModel } from '../models/UsersModel';
import UserContext from '../../context/AuthContext'

export default function DetailsUserController({navigation}) {
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(UserContext);
  //Guarda usuarios traidos de la bd
  const [user, setUser] = useState({});
  //Guardar imagen seleccionada
  const [image, setImage] = useState();
  //Guardar los eventos de la bd
  const [events, setEvents] = useState([]);
  //Muestra o oculta modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  //intereses marcados Checkbox
  const [selectedInterests, setSelectedInterests] = useState([]);


  //Buscar el usuario con el id del context, hacemos uso de la clase "UsersModel"
  useEffect(() => {
    const fetchUserById = async () => {
      setLoading(true);
        try {
            const unsubscribe = await UsersModel.getUserById(userId, (userData) => {
                setUser(userData); // Actualizamos el estado del usuario con los datos recibidos
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };
    fetchUserById();
  }, []); 


  //Actualizar imagen
  const uploadImage = async (mode) => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result;
      if (mode === 'camera') {
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1
        });
      } else if (mode === 'gallery') {
        result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1
        });
      }

      if (!result.cancelled) {
        // Guardar imagen
        await saveImg(result.assets[0].uri);

      }
    } catch (error) {
      console.log("Error al cargar la imagen:", error);
      setIsModalVisible(false);
    }
  };


  const saveImg = async (image) => {
    try {
      setImage(image);
      setIsModalVisible(false);
    } catch (error) {
      throw error;
    }
  }

  //Bucar todos los eventos de la bd, hacemos de uso de la clase "UsersModel" y "eventsModel"
  useEffect(() => {
    setLoading(true);
    const fetchEvents = async () => {
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


 if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImgProfile
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        user={user}
        uploadImage={uploadImage}
        image={image} />

      <Intereses
        styles={styles.section}
        handleInterestChange={handleInterestChange} />

      <EventHistory events={events} onDeleteEvent={deleteEvent} />
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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


