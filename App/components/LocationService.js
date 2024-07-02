import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export const useLocationService = (setLocation, setErrorMsg) => {

  //Permisos de obtener la ubicacion actual y obtenerla
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
        console.log(location);
      } catch (error) {
        setErrorMsg('Error fetching location');
        console.error(error);
      }
    })();
  }, []);
};
