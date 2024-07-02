import { View, Text, Image } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'

export default function MarkerMap({ place }) {
    //Marcador del mapa, para los eventos.
    return (
        <Marker
            coordinate={{
                latitude: place.coordinates?.latitude,
                longitude: place.coordinates?.longitude
            }}
            onPress={() => { console.log('MOSTRAR DETALLE EVENTO O MOSTRAR ALGO', place.event_name) }}>

            {/* por si quiere persinalizar el marker con imagen*/}
            {/* <Image source={require('../../../assets/images/marker.png')} style={{width:60, height:60}}/> */}

        </Marker>
    )
}