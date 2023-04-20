import { FC, useMemo } from 'react'
import { View, StyleSheet } from 'react-native'

import { Avatar, Button, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

import { useNavigation } from '@react-navigation/native';

const Profile: FC = () => {

    const { id, fullName } = useSelector((store: RootState) => ({
        //loading: store.auth.loading,
        id: store.auth.id,
        fullName: store.auth.fullName
        //error: store.auth.error
    }))

    const navigation = useNavigation()

    const userName:string = useMemo(() => {
        const n = fullName.split(" ");
        const firstName = n[0]
        const lastName = n[1]
        return (firstName[0]+lastName[0]);
    }, [fullName])


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ padding: 8 }}>
                {id.trim().length > 0 && <Avatar.Text style={{alignSelf:"center", marginBottom:20}} size={60} label={userName} /> }
                <Text style={styles.title}> Welcome to Tadly,  Your best Learning platform  </Text>
            </View>

            <View>
                {id.trim().length === 0 && <Button mode='text' style={{ padding: 8 }} labelStyle={{ fontWeight: "bold" }} textColor={'#33907C'} onPress={() => navigation.navigate('login')}> Already have an account </Button>}

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