import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const Chart = ({ data, values }) => {
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
    <LineChart
      data={chartData}
      width={screenWidth}
      height={220}
      chartConfig={{
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
    />
  );
};

export default Chart;