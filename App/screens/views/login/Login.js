import { View, Text, StyleSheet, Button, TextInput, Platform } from 'react-native'
import React from 'react'

export default function Login({ email, setEmail, password, setPassword, login }) {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text>Email</Text>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#313131"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Contraseña</Text>
                <TextInput
                    placeholder="Contraseña con 6 caracteres"
                    placeholderTextColor="#313131"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                />
            </View>

            <View style={styles.button}>
                <Button
                    color={Platform.OS === 'ios' ? '#fff' : '#d00281'}
                    title="ENTRAR"
                    onPress={() => login()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
    inputContainer: {
        marginTop: 20,
        width: '80%',
        height: 50,
    },
    input: {
        borderBottomWidth: .3,
        borderBottomColor: '#313131',
        width: '100%',
        fontSize: 20,
        color: '#000'
    },
    button: {
        width: '80%',
        marginTop: 10,
        backgroundColor: '#d00281'
    }

})