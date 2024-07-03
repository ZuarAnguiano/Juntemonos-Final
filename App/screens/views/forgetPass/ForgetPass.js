import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';

export default function ForgotPass({ handleResetPassword, email, setEmail }) {

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Olvide la contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <View style={styles.button}>
                <Button
                    color={Platform.OS === 'ios' ? '#fff' : '#d00281'}
                    title="SEND"
                    onPress={handleResetPassword}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width:'80%',
        fontSize: 16,
    },
    button: {
        width: '80%',
        marginTop: 10,
        backgroundColor: '#d00281',

    }
});
