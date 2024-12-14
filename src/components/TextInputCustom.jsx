import React from 'react';
import {Text, StyleSheet, TextInput } from 'react-native';

const TextInputCustom = ({placeholder, caption, value, keyboardType, onChangeText}) => {

    return(
        <TextInput 
            style={styles.textInput}
            placeholder={placeholder}
            caption={caption}
            value={value}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
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

export default TextInputCustom;