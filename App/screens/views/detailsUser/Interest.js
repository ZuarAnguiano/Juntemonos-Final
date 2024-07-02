import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import Interest from '../../../Utils/Interest.json';

export default function Intereses({ handleInterestChange}) {

    const [interestSelection, setInterestSelection] = useState({});

    // Función para manejar el cambio de estado de un checkbox específico
    const handleCheckboxChange = (interest, isChecked) => {
        const updatedSelection = { ...interestSelection, [interest]: isChecked };
        setInterestSelection(updatedSelection);
        if (handleInterestChange) {
            handleInterestChange(interest, isChecked); // Llama a la función de la vista principal con el interés y si está seleccionado o no
        }
    };

    return (
        <View style={styles.sectionInterest}>
            <Text style={styles.headerText}>Intereses</Text>
            <View style={styles.columnsContainer}>
                {Interest.interest.map((interest, index) => (
                    <View key={index} style={{ flexDirection: 'row', width: '25%' }}>
                        <View style={styles.checkboxContainer}>
                            <Checkbox
                                value={interestSelection[interest] || false}
                                onValueChange={(isChecked) => handleCheckboxChange(interest, isChecked)}
                                color={'#d00281'}
                                style={styles.checkbox}
                            />
                        </View>
                        <View style={styles.checkboxText}>
                            <Text numberOfLines={1} ellipsizeMode="tail">{interest}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionInterest: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        justifyContent: 'center',
    },
    columnsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    checkboxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '25%',
        marginBottom: 10,
    },
    checkbox: {
        alignSelf: 'center',
    },
    checkboxText: {
        marginHorizontal: 5,
        flexShrink: 1, // Hace que el texto no desborde
        alignItems: 'center',
    },
});
