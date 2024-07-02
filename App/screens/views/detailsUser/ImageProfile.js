import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import ModalPhoto from './ModalPhoto'

export default function ImgProfile({isModalVisible, setIsModalVisible, user, uploadImage, image}) {

    const defaultImage = require('../../../../assets/favicon.png')
    return (
        <View style={styles.profileSection}>
            <View style={styles.imgContainer}>
                <Image source={{ uri: image}} defaultSource={defaultImage} style={styles.image} />
                <TouchableOpacity>
                    <Text style={styles.changePhotoText} onPress={() => setIsModalVisible(true)}>Cambiar foto</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.personalData}>
                <ScrollView >
                    <Text style={styles.headerText}>Datos Personales</Text>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                    <Text>Nombre: {`${user.name}`}</Text>
                    <Text>Email: {user.email}</Text>
                    <Text>Edad: {user.age} años</Text>
                </ScrollView>
            </View>


            <ModalPhoto isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} uploadImage={uploadImage} />

        </View >
    )
}


const styles = StyleSheet.create({
    profileSection: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    imgContainer: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
        height: 120,
        width: 120,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 45,
    },
    changePhotoText: {
        color: '#d00281',
        textDecorationLine: 'underline',
        marginTop: 10,
    },
    personalData: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderColor: '#000',
        padding: 5,
        height: 150,
        width: 150
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        justifyContent: 'center',
        textAlign: 'center'
    }
})