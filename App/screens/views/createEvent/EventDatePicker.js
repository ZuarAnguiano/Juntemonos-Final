import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function EventDatePicker({ date, showDatepicker, showTimepicker, formatDate, formatTime }) {
    return (
        <View style={styles.dateContainer}>
            <TouchableOpacity onPress={showDatepicker}>
                <Text style={styles.inputDate}>{formatDate(date)}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={showTimepicker}>
                <Text style={styles.inputDate}>{formatTime(date)}</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputDate: {
        padding: 5,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        textAlign: 'center'
    },
})