import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const StarRating = ({ rating }) => {
    //Redondea rating hacia abajo
    const fullStars = Math.floor(rating);
    //Si hay residuo se establece como 1 y si no, se establece como 0
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    //Se restan
    const emptyStars = 5 - fullStars - halfStars;

    return (
        <View style={styles.starContainer}>
            {Array(fullStars).fill().map((_, index) => (
                <FontAwesome key={`full-${index}`} name="star" size={24} color="purple" />
            ))}
            {halfStars === 1 && <FontAwesome name="star-half-empty" size={24} color="purple" />}
            {Array(emptyStars).fill().map((_, index) => (
                <FontAwesome key={`empty-${index}`} name="star-o" size={24} color="purple" />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: 'row',
    },
});

export default StarRating;
