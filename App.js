import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {useFonts} from 'expo-font';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Account from './src/screens/Account';
import History from './src/screens/History';

// Prevent the splash screen from auto-hiding
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabStack = () => {
  const navigation = useNavigation();
  return(
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#001F3B',
        tabBarInActiveTintColor: '#868686',
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: 13,
          marginBottom: 5,
          fontWeight: '700',
        },
        tabBarIcon: ({color, size}) => {
          let iconName;

          if(route.name === 'Home'){
            iconName='home', iconSize=25;
          }else if(route.name === 'Account'){
            iconName='account', iconSize=25;
          }else if(route.name === 'History'){
            iconName='history', iconSize=25;
          }

          return(            
            <MaterialCommunityIcons
              name={iconName}
              size={iconSize}
              color={color}
              style={{ marginTop: 2 }}
            />
          )
        }
      })}
    >
      <Tab.Screen name='Home' component={Home}/>
      <Tab.Screen name='Account' component={Account}/>
      <Tab.Screen name='History' component={History}/>
    </Tab.Navigator>    
  )
}

const App = () => {
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
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="TabStack" component={TabStack}/>
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

export default App;
