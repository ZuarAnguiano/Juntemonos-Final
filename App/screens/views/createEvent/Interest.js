import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Interest from '../../../Utils/Interest.json';

export default function Intereses({ handleInterestChange }) {
    const [selectedInterests, setSelectedInterests] = useState({});

    const toggleInterestSelection = (interest) => {
        const isSelected = !selectedInterests[interest];
        const updatedSelection = { ...selectedInterests, [interest]: isSelected };
        setSelectedInterests(updatedSelection);
        if (handleInterestChange) {
            handleInterestChange(interest, isSelected);
        }
    };

    const renderInterests = () => {
        return Interest.interest.map((item, index) => (
            <TouchableOpacity
                key={index}
                style={[
                    styles.interestItem,
                    selectedInterests[item] && styles.selectedInterestItem,
                ]}
                onPress={() => toggleInterestSelection(item)}
            >
                <Text style={styles.interestText}>{item}</Text>
            </TouchableOpacity>
        ));
    };

    return (
        <View style={styles.sectionInterest}>
            <Text style={styles.headerText}>Intereses</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {renderInterests()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionInterest: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    scrollContainer: {
        flexDirection: 'row', // Para numColumns=2
        flexWrap: 'wrap', // Para numColumns=2
        justifyContent: 'space-between', // Para numColumns=2
    },
    interestItem: {
        width: '48%', // Para numColumns=2
        marginVertical: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#d00281',
        borderRadius: 5,
        alignItems: 'center',
    },
    selectedInterestItem: {
        backgroundColor: '#d00281',
    },
    interestText: {
        color: '#000',
    },
});
