import React from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

const ButtonFilled = ({buttonName, onPress}) => {

    return(
        <TouchableOpacity style={styles.buttonFill} onPress={onPress}>
            <Text style={styles.buttonTextFill}>{buttonName}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    buttonFill:{
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#0191BE',
        padding: 7,
        paddingHorizontal: 25,
    },
    buttonTextFill:{
        fontSize: 18,
        color: '#ffffff',
        fontFamily: 'NewsReader-Bold',
    }
});

export default ButtonFilled;