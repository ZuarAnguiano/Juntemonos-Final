import React, { useState } from 'react';
import Navigation from './App/Navigation/Navigation';
import { useLocationService } from './App/components/LocationService';
import { UserLocationContext } from './App/context/UserLocationContext';
import { AuthProvider } from './App/context/AuthContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler';


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
    <GestureHandlerRootView>
      <AuthProvider>
        <UserLocationContext.Provider value={{ location, setLocation }}>
          <Navigation />
        </UserLocationContext.Provider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}