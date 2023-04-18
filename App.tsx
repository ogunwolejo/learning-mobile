import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';

// third party
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// application modules
import { theme } from './theme';
import { store } from './store/store';
import Layout from './screen/Layout';
import Login from './screen/auth/Login';
import Signup from './screen/auth/Signup';
import Course from './screen/course/Course';
import InnerCourse from './screen/course/InnerCourse';
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {

  let [isToken, setIsToken] = useState<boolean>(false);

  let [loading, setLoading] = useState<boolean>(true);

  /*useEffect(() => {
    (async () => {
      const userToken = await AsyncStorage.getItem('@token')

      if (userToken !== null) {
        setIsToken(true);
      } else {
        setIsToken(false);
      }
      setLoading(false)
      console.log(userToken)
    })()

  }, [])*/


  useEffect(() => {
    (async () => {
      await SplashScreen.hideAsync();
    })()
  }, [loading]);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer >
          <Stack.Navigator screenOptions={{
            headerShown: false,
            headerBackVisible: true
          }}
            initialRouteName={`app`}
          >
            {/*grouping the authentication screens*/}

            <Stack.Group>
              <Stack.Screen name='login' component={Login} />
              <Stack.Screen name='signup' component={Signup} />
            </Stack.Group>


            <Stack.Screen name='app' component={Layout} />

            <Stack.Screen name='course' component={Course} options={{ headerBackButtonMenuEnabled: true, headerShown: true, title: "Courses" }} />
            <Stack.Screen name='el' component={InnerCourse} options={{ headerBackButtonMenuEnabled: true, headerShown: false, }} />

          </Stack.Navigator>

        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}



