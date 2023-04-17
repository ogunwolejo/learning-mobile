import { FC } from 'react'
import { View, StyleSheet } from 'react-native'

import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const Explore: FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text> Explore App </Text>
            </View>
        </SafeAreaView>
    )
}

export default Explore

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});