import React from 'react';
import {View, Text, StyleSheet, Image } from 'react-native';
import ButtonFilled from '../components/ButtonFilled';
import Button from '../components/Button';
import TextInputCustom from '../components/TextInputCustom';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();

    const onLogin = () => {
        navigation.navigate('Home');
    }

    const onRegister = () => {
        navigation.navigate('Register');
    } 

    return(
        <View style={styles.container}>
            <Image style={styles.img} source={require('../assets/images/Login.png')}/>
            <Text style={styles.mainText}>Login</Text>
            <View style={styles.form}>
                <TextInputCustom placeholder='Enter Username'/>
                <View style={styles.buttonSet}>
                    <Button buttonName='Login' onPress={onLogin}/>
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
        marginTop: 20,
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
    },
    buttonSet:{
        marginTop: 25,
        marginHorizontal: 90,
        gap: 10,
    },
});

export default Login;