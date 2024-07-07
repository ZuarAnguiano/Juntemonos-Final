import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


export default function ModalPhoto({ isModalVisible, setIsModalVisible, uploadImage }) {


    const handleUploadImage = (mode) => {
        console.log(mode)
        uploadImage(mode); // Llama a la función uploadImage de ImgProfile
    };

    return (
        <Modal visible={isModalVisible} onRequestClose={() => setIsModalVisible(true)} animationType='slide' transparent={true}>
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        onPress={() => setIsModalVisible(true)}
                        style={styles.closeButton}
                    >
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    <View style={styles.containerOptions}>
                        <TouchableOpacity onPress={() => handleUploadImage("camera")}>
                            <View style={styles.contentOptions}>
                                <AntDesign name="camera" size={24} color="#d00281" />
                                <Text >Camara</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleUploadImage("gallery")}>
                            <View style={styles.contentOptions}>
                                <FontAwesome name="photo" size={24} color="#d00281" />
                                <Text>Galeria</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        padding: 50, 
        justifyContent: 'center'
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#d00281',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    containerOptions:{
        flexDirection: 'row'
    },
    contentOptions:{
        alignItems: 'center', 
        marginHorizontal: 20
    }


})