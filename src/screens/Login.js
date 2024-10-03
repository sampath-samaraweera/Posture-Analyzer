import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity } from 'react-native';

const Login = () => {

    return(
        <View style={styles.container}>
            <Image style={styles.img} source={require('../assets/images/Login.png')}/>
            <Text style={styles.mainText}>Login</Text>
            <View style={styles.form}>
                <TextInput 
                    style={styles.textInput}
                    placeholder='Enter Username'
                />
                <View style={styles.buttonSet}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonFill}>
                        <Text style={styles.buttonTextFill}>Register</Text>
                    </TouchableOpacity>
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
    textInput:{
        marginBottom: 20,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#000000',
        backgroundColor: '#ffffff',
        width: '100%',
        fontSize: 16,
        padding: 7,
        paddingHorizontal: 15,
    },
    buttonSet:{
        gap: 10,
    },
    button:{
        alignSelf: 'center',
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
    buttonFill:{
        alignSelf: 'center',
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

export default Login;