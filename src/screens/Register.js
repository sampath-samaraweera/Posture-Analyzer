import React from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import ButtonFilled from '../components/ButtonFilled';
import TextInputCustom from '../components/TextInputCustom';
import PasswordInputCustom from '../components/PasswordInputCustom';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
    const navigation = useNavigation();
    const onRegister = () => {
        navigation.navigate('Home');
    } 

    return(
        <View style={styles.container}>
            <Text style={styles.mainText}>Register</Text>
            <View style={styles.form}>
                <TextInputCustom placeholder='Enter Username'/>
                <TextInputCustom placeholder='Enter Name'/>
                <TextInputCustom placeholder='Enter Mobile Number'/>
                <TextInputCustom placeholder='Enter Birthday'/>
                <PasswordInputCustom placeholder='Enter Password'/>
                <View style={styles.buttonSet}>
                    <ButtonFilled buttonName='Register' onPress={onRegister}/>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#001F3B',
        alignItems: 'center',
    },
    mainText:{
        color: '#ffffff',
        fontSize: 44,
        fontFamily: 'NewsReader-Bold',
        marginTop: 60,
    },
    img:{
        width: '55%',
        height: '29%',
        marginTop: '18%',
        alignItems: 'center',
    },
    form:{
        marginTop: 20,
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 40,
        gap: 15,
    },
    buttonSet:{
        marginTop: 20,
        marginHorizontal: 90,
    },
});

export default Register;