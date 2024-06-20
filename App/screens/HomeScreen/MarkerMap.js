import { View, Text, Image } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'

export default function MarkerMap({place}) {
    return ( 
        <Marker
            coordinate={{
                latitude: place.location?.latitude,
                longitude: place.location?.longitude
            }}
            onPress={()=>{console.log('MOSTRAR DETALLE EVENTO O MOSTRAR ALGO', place.event_name)}}>

            {/* <Image source={require('../../../assets/images/marker.png')} style={{width:60, height:60}}/> */}

        </Marker>
    )
}