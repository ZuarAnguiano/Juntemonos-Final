import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { EventsModel } from '../models/EventsModel';
import { UserLocationContext } from '../../context/UserLocationContext';
import AppMapView from '../views/home/MapView';

export default function HomeController({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const { location } = useContext(UserLocationContext);
  const [searchText, setSearchText] = useState('');
  const [region, setRegion] = useState(null);

  useEffect(() => {
    const unsubscribe = EventsModel.listenToEvents((events) => {
      setEvents(events);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (location) {
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0421,
      });
    }
  }, [location]);

  const handleSearch = () => {
    const eventLocation = events.find(event => event.name.toLowerCase() === searchText.toLowerCase());
    if (eventLocation) {
      setRegion({
        latitude: eventLocation.coordinates.latitude,
        longitude: eventLocation.coordinates.longitude,
        latitudeDelta: 0.0042,
        longitudeDelta: 0.0041,
      });
    } else {
      Alert.alert('Ese evento no existe');
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
      <AppMapView
        events={events}
        searchText={searchText}
        setSearchText={setSearchText}
        region={region}
        handleSearch={handleSearch}
      />
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('DetailsUser')}>
          <FontAwesome name="user-circle-o" size={40} color="#d00281" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Events')}>
          <FontAwesome5 name="clipboard-list" size={40} color="#d00281" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zindex: 1,
  },
  iconsContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: -112,
  },
});
