import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text } from 'react-native';

const Chart = ({ data, values, title }) => {
  const screenWidth = Dimensions.get('window').width;

  const chartData = {
    labels: data?.map((item) => new Date(item.created_at).toLocaleTimeString()), // Time labels
    datasets: [
      {
        data: values,// Sensor values
      },
    ],
  };

  return (
    <View>
    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 10, marginBottom: 5 }}>
      {title}
    </Text>
    <LineChart
      data={chartData}
      width={screenWidth}
      height={220}
      chartConfig={{
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#001F3B',
        backgroundGradientTo: '#0191BE',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
    />
    </View>
  );
};

export default Chart;