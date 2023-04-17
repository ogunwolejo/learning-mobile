import { FC } from 'react'
import { View, StyleSheet } from 'react-native'

import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile: FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text> Profile App </Text>
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
});