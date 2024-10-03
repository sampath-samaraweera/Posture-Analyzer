import React from 'react';
import {Text, StyleSheet, TextInput } from 'react-native';

const PasswordInputCustom = ({placeholder}) => {

    return(
        <TextInput 
            style={styles.textInput}
            placeholder={placeholder}
            secureTextEntry={true}
        />
    )
}
const styles = StyleSheet.create({
    textInput:{
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#000000',
        backgroundColor: '#ffffff',
        width: '100%',
        fontSize: 16,
        padding: 7,
        paddingHorizontal: 15,
    },
});

export default PasswordInputCustom;