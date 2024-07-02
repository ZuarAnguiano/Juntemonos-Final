import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function ToggleButtons({ onSetTypeUser }) {
    const [activeButton, setActiveButton] = useState('button1');

    const handleButtonPress = (button, typeUser) => {
        setActiveButton(button);
        onSetTypeUser(typeUser);
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                    title="Freemium"
                    onPress={() => handleButtonPress('button1', 'freemium')}
                    color={activeButton === 'button1' ? '#007AFF' : '#CCCCCC'}
                />

                <Button
                    title="Premium"
                    onPress={() => handleButtonPress('button2', 'premium')}
                    color={activeButton === 'button2' ? '#007AFF' : '#CCCCCC'}
                />

                <Button
                    title="Premium Empresarial"
                    onPress={() => handleButtonPress('button3', 'premium-empresarial')}
                    color={activeButton === 'button3' ? '#007AFF' : '#CCCCCC'}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
});
