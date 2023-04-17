import { FC } from 'react'
import { View, StyleSheet, } from 'react-native'

import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const Signup: FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text> Signup Screen </Text>
            </View>
        </SafeAreaView>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});