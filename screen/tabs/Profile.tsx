import { FC } from 'react'
import { View, StyleSheet } from 'react-native'

import { Button, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

import { useNavigation } from '@react-navigation/native';

const Profile: FC = () => {

    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ padding: 8 }}>
                <Text style={styles.title}> Welcome to Tadly,  Your best Learning platform  </Text>
            </View>

            <View>
                <Button mode='text' style={{ padding: 8 }} labelStyle={{ fontWeight: "bold" }} textColor={'#33907C'} onPress={() => navigation.navigate('login')}> Already have an account </Button>

            </View>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        letterSpacing: 2,
        textAlign: 'center',
        color: '#33907C'
    },
});