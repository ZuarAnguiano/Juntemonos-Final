import React, { useState } from 'react';
import Navigation from './App/Navigation/Navigation';
import { useLocationService } from './App/screens/HomeScreen/LocationService';
import { UserLocationContext } from './App/screens/HomeScreen/UserLocationContext';


export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useLocationService(setLocation, setErrorMsg);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
    <Navigation />
    </UserLocationContext.Provider>
  );
}