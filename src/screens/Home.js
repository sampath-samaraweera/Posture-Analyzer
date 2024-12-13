import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


const Home = () => {
    const [angle, setAngle] = useState();
    const [flex1, setFlex1] = useState();
    const [flex2, setFlex2] = useState();
    const [neckTopX1, setNeckTopX1] = useState();
    const [neckTopY1, setNeckTopY1] = useState();
    const [neckMiddle, setNeckMiddle] = useState();
    const [isNotificationSent, setIsNotificationSent] = useState(false);

    //local storage
    const [neckTopX1Min, setNeckTopX1Min] = useState();
    const [neckTopY1Min, setNeckTopY1Min] = useState();
    const [flex1Min, setFlex1Min] = useState();
    const [flex2Min, setFlex2Min] = useState();

    let notificationSent = false;
    const navigation = useNavigation();

    const requestNotificationPermissions = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Notification Permission Required',
            'To receive alerts about the postures, Please enable notifications!',
            [
              { text: 'Enable', onPress: () => requestNotificationPermissions() },
              { text: 'Cancel', style: 'cancel' },
            ]
          );
        } else {
          console.log('Notification permission granted.');
        }
      };

    const THINGSPEAK_API_URL = 'https://api.thingspeak.com/channels/2710359/feeds.json?api_key=UG3S9MQSVZ6LEKZP&results=1';

    const fetchData = async () => {
        try {
            const response = await axios.get(THINGSPEAK_API_URL);
            console.log(response.data); 
            setNeckTopX1(response.data.feeds[0].field1);
            setNeckTopY1(response.data.feeds[0].field2);
            setNeckMiddle(response.data.feeds[0].field3);
            setFlex1(response.data.feeds[0].field7);
            setFlex2(response.data.feeds[0].field8);
        } catch (err) {
            console.log('Error:', err.message);
        }
    };

    TaskManager.defineTask('BACKGROUND_FETCH', async () => {
        try {
            // Fetch data and store locally
            const response = await axios.get(THINGSPEAK_API_URL);
            const neckTopX1 = response.data.feeds[0].field1;
            const neckTopY1 = response.data.feeds[0].field2;
            const neckMiddle = response.data.feeds[0].field3;
            const flex1 = response.data.feeds[0].field7;
            const flex2 = response.data.feeds[0].field8;
            
            console.log("NeckTop X1:", neckTopX1);
            console.log("NeckTop Y1:", neckTopY1);
            console.log("NeckMiddle:", neckMiddle);
            console.log("Fetched Flex1:", flex1);
            console.log("Fetched Flex2:", flex2);
    
            // Check if conditions meet the threshold
            
            if (!(neckTopX1 > neckTopX1Min && neckTopY1 > neckTopY1Min && 
                (flex1 < flex1Min) && 
                (flex2 < flex2Min)) && !notificationSent) {
                await showNotification();
                notificationSent = true;
            } else if (!(neckTopX1 > neckTopX1Min && neckTopY1 > neckTopY1Min && 
                (flex1 < flex1Min) && 
                (flex2 < flex2Min))) {
                notificationSent = false; 
            }
    
            return BackgroundFetch.Result.NewData;
        } catch (error) {
            console.log('Error in Background Fetch:', error);
            return BackgroundFetch.Result.Failed;
        }
    });

      const registerBackgroundFetch = async () => {
        try {
          const status = await BackgroundFetch.getStatusAsync();
          console.log("Background Fetch Status:", status);
          
          await BackgroundFetch.registerTaskAsync('BACKGROUND_FETCH', {
            minimumInterval: 15,
            stopOnTerminate: false,
            startOnBoot: true,
          });
          console.log("Background fetch registered successfully.");
        } catch (error) {
          console.error("Failed to register background fetch:", error);
        }
    };
    

    const showNotification = async () => {
        console.log("Show Notification");
        await Notifications.scheduleNotificationAsync({
            content: {
            title: "Warning!",
            body: "You are in the wrong Posture.",
            sound: true,
            },
            trigger: null,
        });
    };
      
    useEffect(() => {
        // Load saved data from local storage on component mount
        const loadData = async () => {
          const savedValues = await AsyncStorage.getItem('formValues');
          if (savedValues) {
            const values = JSON.parse(savedValues);
            setNeckTopX1Min(values.neckTopX1Min);
            setNeckTopY1Min(values.neckTopY1Min);
            setFlex1Min(values.flex1Min);
            setFlex2Min(values.flex2Min);
          }else{
            setNeckTopX1Min(150);
            setNeckTopY1Min(150);
            setFlex1Min(500);
            setFlex2Min(2400);
          }
        };
        loadData();

        requestNotificationPermissions();
        fetchData();
        registerBackgroundFetch();
        
        // Set up interval for repeated API calls
        const intervalId = setInterval(fetchData, 12000); // fetch every 5 seconds

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
      }, []);


    useEffect(() => {
        // Check posture conditions and trigger alert if necessary
        console.log("Neck top X1", neckTopX1)
        console.log("Neck top Y1", neckTopY1)
        console.log("Neck middle ",neckMiddle)
        console.log("flex 1",flex1)
        console.log("flex 2",flex2)
        if (neckTopX1 && neckTopY1 && flex1 && flex2 ){
            if (neckTopX1 != 0 || neckTopY1 != 0 || flex1 != 0 || flex2 != 0) {
                if (!(neckTopX1 > neckTopX1Min && neckTopY1 > neckTopY1Min && 
                    (flex1 < flex1Min) && 
                    (flex2 < flex2Min))) {
                    if (!isNotificationSent) {
                        Alert.alert(
                            'Warning!',
                            'You are in the wrong Posture.',
                            [{ text: 'Ok', onPress: () => setIsNotificationSent(true) }]
                        );
                        setIsNotificationSent(true)
                    }
                } else {
                    // Reset notification if posture is correct
                    setIsNotificationSent(false);
                }
            } else{
                Alert.alert(
                    'Alert!',
                    'You are not connected.',
                );
            }
        }

    }, [flex1, flex2, neckTopX1, neckTopY1, isNotificationSent])



    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Posture Analyzer</Text>
            </View>
            <View style={styles.imgContainer}>
                {neckTopX1 && neckTopY1 && flex1 && flex2? (              
                    (neckTopX1 > neckTopX1Min && neckTopY1 > neckTopY1Min && 
                    (flex1 < flex1Min) && 
                    (flex2 < flex2Min)) ? (
                        <>
                            <Image style={styles.img} source={require('../assets/images/poses/Correct.jpg')}/>
                            <Text style={styles.poseText}>You are in the right Posture </Text>
                        </>
                    ):(
                        flex1 > flex1Min || flex2 > flex2Min ? (
                            <>
                                <Image style={styles.img} source={require('../assets/images/poses/Wrong 2.jpg')}/>
                                <Text style={styles.poseTextWrong}>You are in the wrong Posture </Text>
                            </>
                        ):(
                            <>
                                <Image style={styles.img} source={require('../assets/images/poses/Wrong.jpg')}/>
                                <Text style={styles.poseTextWrong}>You are in the wrong Posture </Text>
                            </>
                        )
                    )
                ):(
                    <>
                        <Image style={{marginTop: 40}} source={require('../assets/images/poses/Warning.png')}/>
                        <Text style={styles.notConnected}>You are not connected.</Text>
                    </>
                )}                
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },    
    imgContainer:{
        flex: 1,
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
        width: 250,
        height: 350,
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
    poseTextWrong:{
        color: '#ff0000',
        fontSize: 24,
        fontFamily: 'NewsReader-Bold',
        marginTop: 20,
    },
    notConnected:{
        color: '#ff9900',
        fontSize: 24,
        fontFamily: 'NewsReader-Bold',
        marginTop: 20,
    },
});

export default Home;