import { FC, useEffect, useLayoutEffect } from 'react'
import { StyleSheet } from 'react-native'
import Material from 'react-native-vector-icons/MaterialIcons'

import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import Explore from './tabs/Explore';
import Profile from './tabs/Profile';
import { useAppTheme } from '../theme'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesThunck } from '../store/reducers/thunck'


const Tab = createMaterialBottomTabNavigator();

const Layout: FC = () => {
    const dispatch = useDispatch()

   
    const {
        colors: {
            brandPrimary
        }
    } = useAppTheme()

    return (
        <Tab.Navigator barStyle={{ backgroundColor: brandPrimary }} sceneAnimationEnabled={false} backBehavior='history' keyboardHidesNavigationBar
            shifting={true}
        >
            <Tab.Screen name='explore' component={Explore} options={{
                tabBarLabel: 'Search',
                tabBarIcon: ({ focused, color }) => (<Material name='search' color={color} size={20} />),
                tabBarColor: 'transparent',
            }} />
            <Tab.Screen name='profile' component={Profile} options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ focused, color }) => (<Material name='person' color={color} size={20} />)
            }} />
        </Tab.Navigator>
    )
}

export default Layout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});