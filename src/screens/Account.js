import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';
import ButtonFilled from '../components/ButtonFilled';
import TextInputCustom from '../components/TextInputCustom';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Account = () => {
    const navigation = useNavigation();

    const [neckTopX1Min, setNeckTopX1Min] = useState();
    const [neckTopY1Min, setNeckTopY1Min] = useState();
    const [flex1Min, setFlex1Min] = useState();
    const [flex2Min, setFlex2Min] = useState();

    const [data, setData] = useState();

    const saveData = async () => {
        // Set default values if inputs are empty
        const dataToSave = {
          neckTopX1Min: neckTopX1Min || 150,
          neckTopY1Min: neckTopY1Min || 150,
          flex1Min: flex1Min || 500,
          flex2Min: flex2Min || 2400,
        };
        await AsyncStorage.setItem('formValues', JSON.stringify(dataToSave));
        alert('Data saved successfully!');
    };

    const clearData = () => {
        setNeckTopX1Min('');
        setNeckTopY1Min('');
        setFlex1Min('');
        setFlex2Min('');
    };

    const clearStoredData = () => {
        AsyncStorage.removeItem('formValues');
        alert('Stored Data cleared successfully!');
    };

    return(     
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Account</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.mainText}>Customize with your own values</Text>
                    <View style={styles.form}>
                        <TextInputCustom 
                            placeholder='Neck Top X1'
                            type="text" caption="Neck Top X1"
                            value={neckTopX1Min}
                            keyboardType="numeric"
                            onChangeText={setNeckTopX1Min} 
                        />
                        <TextInputCustom 
                            placeholder='Neck Top Y1'
                            type="text" caption="Neck Top Y1"
                            value={neckTopY1Min}
                            keyboardType="numeric"
                            onChangeText={setNeckTopY1Min} 
                        />
                        <TextInputCustom 
                            placeholder='Flex 1 Min'
                            type="text" caption="Flex 1 Min"
                            value={flex1Min}
                            keyboardType="numeric"
                            onChangeText={setFlex1Min} 
                        />
                        <TextInputCustom 
                            placeholder='Flex 1 Max'
                            type="text" caption="Flex 2 Min"
                            value={flex2Min}
                            keyboardType="numeric"
                            onChangeText={setFlex2Min} 
                        />
                        <View style={styles.buttonSet}>
                            <ButtonFilled buttonName="Save" onPress={saveData} />
                            <ButtonFilled buttonName="Clear" onPress={clearData} />
                            <ButtonFilled buttonName="Clear Data" onPress={clearStoredData} />
                        </View>

                    </View>
                </ScrollView>
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
    headerText:{
        fontSize: 24,
        fontFamily: 'NewsReader-Bold',
        color: '#ffffff'
    },
    mainText:{
        color: '#001F3B',
        fontSize: 26,
        fontFamily: 'NewsReader-Bold',
        marginTop: 20,
        marginHorizontal: 10,
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
        justifyContent: 'flex-end',
        display: 'flex',
        marginTop: 20,
        marginHorizontal: 40,
        flexDirection: 'column',
        gap: 8,
    },
});

export default Account;