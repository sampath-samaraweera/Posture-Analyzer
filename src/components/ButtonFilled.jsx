import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

const ButtonFilled = ({buttonName, onPress, iconName}) => {

    return(
        <TouchableOpacity style={styles.buttonFill} onPress={onPress}>
            <Text style={styles.buttonTextFill}>{buttonName}</Text>
            {iconName ? (
                <MaterialCommunityIcons name={iconName} size={20} color="#ffffff"/>):(null)
            }
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    buttonFill:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#0191BE',
        padding: 7,
        paddingHorizontal: 15,
        flexDirection: 'row',
        gap: 5,
    },
    buttonTextFill:{
        fontSize: 18,
        color: '#ffffff',
        fontFamily: 'NewsReader-Bold',
    }
});

export default ButtonFilled;