import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Login({ email, setEmail, password, setPassword, login }) {
    const navigation = useNavigation();
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
                    secureTextEntry={true}
                    style={styles.input}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

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