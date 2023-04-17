import {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native';

// third party
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// application modules
import { theme } from './theme';
import Layout from './screen/Layout';
import Login from './screen/auth/Login';
import Signup from './screen/auth/Signup';

const Stack = createNativeStackNavigator(); 

export default function App() {


  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='app' screenOptions={{
          headerShown:false,
          headerBackVisible:true
        }}>
          {/*grouping the authentication screens*/}
          <Stack.Group>
            <Stack.Screen name='login' component={Login}/>
            <Stack.Screen name='signup' component={Signup} />
          </Stack.Group>

          <Stack.Screen name='app' component={Layout}/>

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}


