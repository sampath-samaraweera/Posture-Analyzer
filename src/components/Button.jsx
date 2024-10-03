import React from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

const Button = ({buttonName, onPress}) => {

    return(
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{buttonName}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button:{
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#ffffff',
        padding: 7,
        paddingHorizontal: 25,
    },
    buttonText:{
        fontSize: 18,
        color: '#001F3B',
        fontFamily: 'NewsReader-Bold',
    },
});

export default Button;