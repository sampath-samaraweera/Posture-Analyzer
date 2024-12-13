import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';
import ButtonFilled from '../components/ButtonFilled';
import TextInputCustom from '../components/TextInputCustom';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import axios from 'axios';
import Chart from '../components/Chart';
import RNFS from 'react-native-fs';
import { PermissionsAndroid, Platform } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const marginHorizontal = 20;

const History = () => {

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

    const fetchHistory = async () => {
        try {
            const response = await axios.get('https://api.thingspeak.com/channels/2710359/feeds.json?api_key=UG3S9MQSVZ6LEKZP&results=5');
            console.log("Hello ", response.data.feeds);
            setData(response?.data.feeds);
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };

    const saveToFile = async (csvData) => {
        const filePath = `${RNFS.DownloadDirectoryPath}/sensor_summary.csv`;
      
        try {
          if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
              console.error('Permission denied');
              return;
            }
          }
          await RNFS.writeFile(filePath, csvData, 'utf8');
          console.log('File saved at:', filePath);
        } catch (error) {
          console.error('Error saving file:', error);
        }
    };

    useEffect(() => {
        fetchHistory();
    },[])

    return(     
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>History</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {data ? ( 
                        <>
                            <Chart data={data} values={data?.map((item) => parseFloat(item.field1))}/>
                            <Chart data={data} values={data?.map((item) => parseFloat(item.field2))}/> 
                            <Chart data={data} values={data?.map((item) => parseFloat(item.field7))}/> 
                            <Chart data={data} values={data?.map((item) => parseFloat(item.field8))}/> 
                        </>
                    ):(null)}
                    <View style={styles.buttonSet}>
                        <ButtonFilled buttonName="Download" onPress={saveData} />
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
        justifyContent: 'flex-end',
        display: 'flex',
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 40,
        flexDirection: 'column',
        gap: 8,
    },
});

export default History;