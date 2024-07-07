import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Platform } from 'react-native'
import React from 'react'

export default function FormRegister({
    email,
    setEmail,
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    name,
    setName,
    handleRegister,
    navigation,
    onShowDatepicker,
    formatDate,
    date,}
) {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text>Nombre</Text>
                <TextInput
                    placeholder="Escriba aqui su nombre"
                    placeholderTextColor="#313131"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Fecha de nacimiento</Text>
                <View style={styles.dateContainer}>
                    <TouchableOpacity onPress={onShowDatepicker}>
                        <Text style={styles.inputDate}>{formatDate(date)}</Text>
                    </TouchableOpacity>
                </View>
            </View>

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
                    placeholder="Contraseña"
                    placeholderTextColor="#313131"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry={true}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Repetir Contraseña</Text>
                <TextInput
                    placeholder="Repetir Contraseña"
                    placeholderTextColor="#313131"
                    value={repeatPassword}
                    onChangeText={setRepeatPassword}
                    style={styles.input}
                    secureTextEntry={true}
                />
            </View>

            <View style={styles.button}>
                <Button
                    color={Platform.OS === 'ios' ? '#fff' : '#d00281'}
                    title="REGISTRARSE"
                    onPress={handleRegister}
                />
            </View>

            <Text
                style={styles.loginText}
                onPress={() => navigation.navigate('Login')}
            >
                ¿Ya tienes cuenta? Haga clic aquí para ingresar
            </Text>

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
    dateContainer: {
        width: '100%',
        height: 50,
    },
    inputDate: {
        borderBottomWidth: 1,
        borderBottomColor: '#313131',
        width: '100%',
        padding: 5,
        fontSize: 16,
    },
    button: {
        width: '80%',
        marginTop: 10,
        backgroundColor: '#d00281'
    },
    loginText: {
        fontSize: 13,
        color: '#808080',
        alignItems: 'center',
        marginTop: 15
    }
})