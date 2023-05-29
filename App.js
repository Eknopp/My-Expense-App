import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import {ExpensesContextProvider} from './store/expenses-context'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function ExpensesOverview() {
  return(
    <Tab.Navigator screenOptions={ ({navigation}) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: '#ffffff',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.tabBarColor },
      tabBarActiveTintColor: GlobalStyles.colors.activeTabIcon,
      tabBarInactiveTintColor: GlobalStyles.colors.inactiveTabIcon,
      headerRight: ({tintColor}) => <IconButton
        icon="add"
        size={24}
        color={tintColor}
        onPress={() => {
          navigation.navigate('ManageExpense')
        }} />
    })}>
      <Tab.Screen name="RecentExpenses" component={RecentExpenses} options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({color, size}) => <Ionicons name="hourglass" size={size} color={color} />
      }} />
      <Tab.Screen name="AllExpensesScreen" component={AllExpenses} options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({color, size}) => <Ionicons name="calendar" size={size} color={color} />
      }}/>
    </Tab.Navigator>
  )
}


export default function App() {

  const [fontsLoaded] = useFonts({
    'san-francisco-regular': require('./assets/fonts/SF-Pro-Display-Medium.otf'),
  })

  useEffect(() => {
    async function prepare(){
      await SplashScreen.preventAutoHideAsync()
    }
    prepare()
  }, []);
  
  if(!fontsLoaded) {
    return null;
  } else {
    setTimeout(SplashScreen.hideAsync, 2000);
  }

  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: '#ffffff'
          }}>
            <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{headerShown: false}}/>
            <Stack.Screen name="ManageExpense" component={ManageExpense} options={{
              presentation: 'modal'
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}


