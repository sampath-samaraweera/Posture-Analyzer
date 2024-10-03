import React from 'react';
import {View, Text, StyleSheet, Image } from 'react-native';
import ButtonFilled from '../components/ButtonFilled';
import Button from '../components/Button';
import TextInputCustom from '../components/TextInputCustom';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Posture Analyzer</Text>
            </View>
            <Image style={styles.img} source={require('../assets/images/poses/Pose01.jpg')}/>
            <Text style={styles.angle}>Current Angle: 29°</Text>
            <Text style={styles.poseText}>You are in the right Posture </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    header:{
        width: '100%',
        padding: 15,
        backgroundColor: '#001F3B',
    },
    headerText:{
        fontSize: 24,
        fontFamily: 'NewsReader-Bold',
        color: '#ffffff'
    },
    img:{
        width: '65%',
        height: '50%',
        marginTop: 40,
        alignItems: 'center',
    },
    angle:{
        color: '#0191BE',
        fontSize: 24,
        fontFamily: 'NewsReader-Bold',
        marginTop: 20,
    },
    poseText:{
        color: '#2D852D',
        fontSize: 24,
        fontFamily: 'NewsReader-Bold',
        marginTop: 20,
    },
});

export default Home;