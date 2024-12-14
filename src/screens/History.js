import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, ScrollView, Platform, Alert} from 'react-native';
import ButtonFilled from '../components/ButtonFilled';
import axios from 'axios';
import Chart from '../components/Chart';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { shareAsync } from 'expo-sharing';

const History = () => {

    const [data, setData] = useState();  
    const [loading, setLoading] = useState(false);


    const fetchHistory = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://api.thingspeak.com/channels/2710359/feeds.json?api_key=UG3S9MQSVZ6LEKZP&results=5');
            console.log("Hello ", response.data.feeds);
            setData(response?.data.feeds);
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }finally{
            setLoading(false);
        }
    };

  

    const saveFile = async (csvData) => {
        try {
            // Define file name and path
            const fileName = 'Posture_Analyzer_History.csv';
            const fileUri = FileSystem.cacheDirectory + fileName;
    
            console.log("File URI:", fileUri);
    
            // Write CSV data to a file
            await FileSystem.writeAsStringAsync(fileUri, csvData, {
                encoding: FileSystem.EncodingType.UTF8,
            });
    
            const fileExists = await FileSystem.getInfoAsync(fileUri);
            console.log("File exists:", fileExists.exists);
    
            if (!fileExists.exists) {
                throw new Error("File not created successfully.");
            }
    
            // For Android, handle permissions and file saving
            if (Platform.OS === 'android') {
                // Request storage access permission (use StorageAccessFramework for Android)
                const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    
                if (permissions.granted) {
                    // Convert file data to base64
                    const base64Data = await FileSystem.readAsStringAsync(fileUri, {
                        encoding: FileSystem.EncodingType.Base64,
                    });
    
                    // Create and save the file to the selected directory
                    await FileSystem.StorageAccessFramework.createFileAsync(
                        permissions.directoryUri,
                        fileName,
                        'text/csv'
                    ).then(async (newFileUri) => {
                        // Write the base64 data to the file
                        await FileSystem.writeAsStringAsync(newFileUri, base64Data, {
                            encoding: FileSystem.EncodingType.Base64,
                        });
                        Alert.alert('Success', 'File saved successfully.');
                    });
                } else {
                    // If permissions are not granted, fall back to shareAsync
                    await shareAsync(fileUri, { mimeType: 'text/csv' });
                    Alert.alert('Success', 'File shared successfully.');
                }
            } else {
                // For iOS or other platforms, directly share the file
                shareAsync(fileUri, { mimeType: 'text/csv' });
                Alert.alert('Success');
            }
        } catch (error) {
            console.error('Error saving file:', error);
            Alert.alert('Error', 'Failed to save file. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    

    const convertToCSV = (data) => {
        const header = 'Time,Neck,Lower Lumbar,External Oblique Left,External Oblique Right\n';
        if (data){
            const rows = data
            .map((item) => `${item.created_at},${item.field1},${item.field2},${item.field7},${item.field8}`)
            .join('\n');
            return header + rows;
        }
        return header;
      }

    const handleDownload = async (data) => {
        console.log("data", data);
        const csvData = convertToCSV(data);
        await saveFile(csvData);
    };

    useEffect(() => {
        fetchHistory();
    },[])

    return(     
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>History</Text>
                </View>
                {loading ? (
                    <ActivityIndicator size={30} color="#001F3B" style={{display:'flex', flex: 1,}} />
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {data ? ( 
                            <>
                                <Chart data={data} title="NeckTop X1" values={data?.map((item) => parseFloat(item.field1))}/>
                                <Chart data={data} title="NeckTop Y1" values={data?.map((item) => parseFloat(item.field2))}/> 
                                <Chart data={data} title="Flex 1" values={data?.map((item) => parseFloat(item.field7))}/> 
                                <Chart data={data} title="Flex 2" values={data?.map((item) => parseFloat(item.field8))}/> 
                            
                                <View style={styles.buttonSet}>
                                    <ButtonFilled buttonName="Download History" onPress={() => handleDownload(data)} iconName="download"/>
                                </View>
                            </>
                        ):(null)}
                    </ScrollView>
                )}
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