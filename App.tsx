import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';

// third party
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// application modules
import { theme } from './theme';
import { RootState, store } from './store/store';
import Layout from './screen/Layout';
import Login from './screen/auth/Login';
import Signup from './screen/auth/Signup';
import Course from './screen/course/Course';
import InnerCourse from './screen/course/InnerCourse';
import * as SplashScreen from 'expo-splash-screen';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken } from './store/reducers/thunck';


SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const dispatch = useDispatch();

  const { id, loading } = useSelector((store: RootState) => ({
    loading: store.auth.loading,
    id: store.auth.id,
    //fullName: store.auth.fullName
    //error: store.auth.error
  }))

  useLayoutEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("@token")
      console.log(token)
      if (token) {
        //@ts-ignore
        await dispatch(verifyToken(token))
      }
      setTimeout(async() => await SplashScreen.hideAsync(), 1000)
      //await SplashScreen.hideAsync();
    })()
  }, [])


  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {
          (id.trim().length > 0) ? (
            <Stack.Navigator screenOptions={{
              headerShown: false,
              headerBackVisible: true
            }}
            >
              <Stack.Screen name='app' component={Layout} />

              <Stack.Screen name='course' component={Course} options={{ headerBackButtonMenuEnabled: true, headerShown: true, title: "Courses" }} />
              <Stack.Screen name='el' component={InnerCourse} options={{ headerBackButtonMenuEnabled: true, headerShown: false, }} />

            </Stack.Navigator>
          ) : (
            <Stack.Navigator screenOptions={{
              headerShown: false,
              headerBackVisible: true
            }}
            >
              {/*grouping the authentication screens*/}
  
              <Stack.Group>
                <Stack.Screen name='login' component={Login} />
                <Stack.Screen name='signup' component={Signup} />
              </Stack.Group>
  
  
              {/*<Stack.Screen name='app' component={Layout} />
  
              <Stack.Screen name='course' component={Course} options={{ headerBackButtonMenuEnabled: true, headerShown: true, title: "Courses" }} />
          <Stack.Screen name='el' component={InnerCourse} options={{ headerBackButtonMenuEnabled: true, headerShown: false, }} /> */}
  
            </Stack.Navigator>
          )
        }

      </NavigationContainer>
    </PaperProvider>
  );
}



