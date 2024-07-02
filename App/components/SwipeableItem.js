import React, { useRef } from 'react';
import { Animated, StyleSheet, View, Text, Alert } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

export default SwipeableItem = ({ children, onSwipeRight }) => {

    const swipeableRef = React.useRef(null);

    const handleDelete = () => {
        Alert.alert(
            'Eliminar evento',
            '¿Está seguro que desea eliminar este evento?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                    onPress: () => swipeableRef.current.close()
                },
                {
                    text: 'Sí',
                    onPress: () => {
                        onSwipeRight(); // Llama a la función para eliminar el evento
                        if (swipeableRef.current) {
                            swipeableRef.current.close(); // Cierra el Swipeable si la referencia es válida
                        }
                    },

                },
            ],
            { cancelable: false }
        );
    };

    return (
        <Swipeable
            rightThreshold={250}
            overshootRight={true}
            ref={swipeableRef}
            onSwipeableOpen={(direction) => {
                if (direction === 'right') {
                    handleDelete();
                }
            }}
            renderRightActions={() =>
                <View style={styles.leftAction}>
                    <Text style={styles.actionText}> Delete</Text>
                </View>
            }>
            {children}
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    leftAction: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#dd2c00',
    },
    container: {
        width: 60,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionText: {
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
    },

});


