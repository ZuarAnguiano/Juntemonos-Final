import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import StarRating from '../../../components/Stars';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function Reviews(rating) {
    return (
        <View style={styles.reviews}>
            <View style={styles.ratingContainer}>
                <Text style={styles.headerText}>Reseñas del evento</Text>
                <View style={styles.starsContainer}>
                    {/* Componente de las estrellas, mando la variable rating */}
                    <StarRating rating={rating.rating} />
                    <View style={styles.pieChart}>
                        <AntDesign name="piechart" size={54} color="purple" />
                    </View>
                </View>
            </View>

            <TouchableOpacity>
                <View style={styles.comments}>
                    <MaterialIcons name="message" size={55} color="purple" />
                    <Text style={styles.textComment}>Comentarios</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

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
})