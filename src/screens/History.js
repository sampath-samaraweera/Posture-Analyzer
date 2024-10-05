import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import ButtonFilled from '../components/ButtonFilled';
import Button from '../components/Button';
import TextInputCustom from '../components/TextInputCustom';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const marginHorizontal = 20;

const History = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>History </Text>
            </View>
            <LineChart
                data={{
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                            data:[
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]
                        }
                    ]
                }}
                width={screenWidth - 2 * marginHorizontal}
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#001F3B",
                    backgroundGradientTo: "#0191BE",
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        padding: 10
                    },
                    propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#001F3B"
                    }
                }}
                style={styles.chart}
            />
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
    chart:{
        marginTop: 20,
        borderRadius: 16,
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

export default History;