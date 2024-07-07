import { View, Text, Platform, StyleSheet } from 'react-native'
import React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import MapViewStyle from '../../../Utils/MapViewStyle.json';

export default function EventMap({ markerCoords, handleMarkerDrag }) {
    return (
        <View style={styles.mapContainer}>
            <MapView
                style={styles.map}
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                showsUserLocation={true}
                customMapStyle={MapViewStyle}
                initialRegion={{
                    latitude: markerCoords.latitude,
                    longitude: markerCoords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={markerCoords}
                    draggable
                    onDragEnd={(e) => handleMarkerDrag(e)}
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: 150,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 30,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})