import { FC } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { ResizeMode } from 'expo-av'
import VideoPlayer from 'expo-video-player'



import { Text } from 'react-native-paper'

const InnerCourse: FC = () => {
    const { height } = useWindowDimensions()

    const { params } = useRoute()

    console.log(params)

    return (
        <SafeAreaView style={styles.container}>
            <VideoPlayer
                    videoProps={{
                        shouldPlay: false,
                        resizeMode: ResizeMode.COVER,
                        source: {
                            uri: params.video,
                        },
                    }}
                    style={{height:height * .6}}
                />
            <View style={{ padding: 15, height:height*.4 }}>
                <ScrollView>
                    <Text style={{ fontSize: 20, fontWeight: "bold", textTransform: "capitalize", letterSpacing: 2 }}>{params.title}</Text>
                    <Text style={{ marginTop: 10, fontSize: 15, fontWeight: "500" }}>{params.description}</Text>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default InnerCourse

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'red',
        //justifyContent: 'center',
        //alignItems:"center"
    },
});