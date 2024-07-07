import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const StarRating = ({ rating, setRating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <TouchableOpacity key={i} onPress={() => setRating(i)}>
                <AntDesign name={i <= rating ? "star" : "staro"} size={32} color="gold" />
            </TouchableOpacity>
        );
    }
    return <View style={styles.stars}>{stars}</View>;
};

const EventReviews = () => {
    const [rating, setRating] = useState(0);

    return (
        <View style={styles.reviews}>
            <View style={styles.ratingContainer}>
                <Text style={styles.headerText}>Reseñas del evento</Text>
                <View style={styles.starsContainer}>
                    <StarRating rating={rating} setRating={setRating} />
                    <View style={styles.pieChart}>
                        <AntDesign name="piechart" size={54} color="purple" />
                    </View>
                </View>
            </View>
            <TouchableOpacity>
                <View style={styles.comments}>
                    <MaterialIcons name="message" size={55} color="purple" />
                    <Text style={styles.textComment}> Comentarios </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    reviews: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#000",
        padding: 10,
        marginBottom: 10,
        paddingHorizontal: 20
    },
    headerText: {
        fontSize: 20,
        marginBottom: 10,
        justifyContent: 'center',
    },
    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pieChart: {
        marginLeft: 100,
    },
    comments: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "60%",
    },
    textComment: {
        fontSize: 20,
        color: '#d00281',
        textDecorationLine: 'underline',
    },
    stars: {
        flexDirection: 'row',
    }
});

export default EventReviews;