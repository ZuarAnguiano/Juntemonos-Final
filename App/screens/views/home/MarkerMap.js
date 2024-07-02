import { View, Text, Image } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native';

export default function MarkerMap({ place }) {
    const navigation = useNavigation();
    //Marcador del mapa, para los eventos.
    return (
        <Marker
            coordinate={{
                latitude: place.coordinates?.latitude,
                longitude: place.coordinates?.longitude
            }}
            onPress={() => {navigation.navigate('DetailsEvent',  {id: place.id} )}}>

            {/* por si quiere persinalizar el marker con imagen*/}
            {/* <Image source={require('../../../assets/images/marker.png')} style={{width:60, height:60}}/> */}

        </Marker>
    )
}