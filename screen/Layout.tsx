import { FC } from 'react'
import { View, StyleSheet } from 'react-native'

import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Explore from './tabs/Explore';
import Profile from './tabs/Profile';

const Tab = createMaterialBottomTabNavigator();

const Layout: FC = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='explore' component={Explore} />
            <Tab.Screen name='profile' component={Profile}/>
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