/*Este archivo contiene todo lo referente a la navegacion */
import { Platform } from 'react-native'
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

//importatmos nuestras screens
import InitiateController from '../screens/controllers/InitiateController'
import LoginController from '../screens/controllers/LoginController'
import RegisterController from '../screens/controllers/RegisterController'
import ForgotPasswordController from '../screens/controllers/ForgetPassController';
import HomeController from "../screens/controllers/HomeController";

import EventsController from "../screens/controllers/EventsController";
import DetailsUserController from '../screens/controllers/DetailsUserController'
import CreateEventController from '../screens/controllers/CreateEventController';
import DetailsEventController from '../screens/controllers/DetailsEventController';

import SettingsScreen from "../screens/SettingsScreen";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


//declaramos una variable en una constante de la clase Navigator
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator screenOptions={{ tabBarActiveTintColor: 'purple' }}>
            <Tab.Screen
                name="Home"
                component={HomeController}
                options={{
                    tabBarLabel: 'inicio',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={30} />
                    ),
                 
                }}
            />

            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'configuraciones',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="brightness-5" color={color} size={30} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function MyStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">

                <Stack.Screen
                    name="Initiate"
                    component={InitiateController}
                />

                <Stack.Screen
                    name="Login"
                    component={LoginController}
                />

                <Stack.Screen
                    name="Register"
                    component={RegisterController}
                />

                <Stack.Screen
                    name="Events"
                    component={EventsController}
                />

                <Stack.Screen
                    name="DetailsUser"
                    component={DetailsUserController}
                />

                <Stack.Screen
                    name="DetailsEvent"
                    component={DetailsEventController}
                />

                <Stack.Screen
                    name="CreateEvent"
                    component={CreateEventController}
                />

                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordController}
                />

                <Stack.Screen
                    name="Tabs"
                    component={MyTabs}
                    options={{
                        headerShown: false,
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}


