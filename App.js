import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login';
import {useFonts} from 'expo-font';

// Prevent the splash screen from auto-hiding
const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    'NewsReader': require('./src/assets/fonts/NewsReader-Regular.ttf'),
    'NewsReader-Bold': require('./src/assets/fonts/Newsreader_36pt-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login" 
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login}/>
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: 20,
  },
});
