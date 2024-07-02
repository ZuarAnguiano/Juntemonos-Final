import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { auth } from '../../firebaseConfig';

export default function SettingsScreen({ navigation }) {

    // Función para cerrar sesión
    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigation.navigate('Initiate');

        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };
    return (
        <View>
            <Text
                style={{
                    fontSize: 30,
                    textAlign: "center",
                    marginTop: "20%"
                }}
            >Settings Screen</Text>

            <View style={styles.container}>
                <Button title="Cerrar sesión" onPress={handleLogout} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        height: 50,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },

})
