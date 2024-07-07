import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import MapViewStyle from '../../../Utils/MapViewStyle.json';

import MarkerMap from './MarkerMap';


export default function AppMapView({ events, searchText, setSearchText, region, handleSearch }) {
    return region && (
        <View>
            <TextInput
                style={styles.searchEvents}
                placeholder="Buscador de eventos"
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={handleSearch}
            />
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    provider={Platform.OS === 'ios' ?  PROVIDER_DEFAULT: PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    customMapStyle={MapViewStyle}
                    region={region}
                >
                    {events.map((event, index) => (
                        <MarkerMap key={index} place={event} />
                    ))}
                </MapView>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchEvents: {
        borderColor: 'gray',
        padding: 8,
        marginTop: 8,
        width: '100%',
        backgroundColor: 'white',
        marginBottom: 40
    },
    mapContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 0,
        overflow: 'hiddem',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

});
