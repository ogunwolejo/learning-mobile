import { FC, useEffect, useLayoutEffect } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

import { Text, List, ActivityIndicator } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { getCourseThunck } from '../../store/reducers/thunck';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useAppTheme } from '../../theme';
import { useNavigation } from '@react-navigation/native';

const FetchCourse: FC<{ title: string; video: string; description?: string }> = ({ title, video, description }) => {
    const {
        colors: {
            brandPrimary
        }
    } = useAppTheme()

    const navigation = useNavigation()

    return (
        //@ts-ignore
        <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate('el', {title, video, description })}>
            <List.Item
            title={title}
            description={description}
            titleStyle={{
                fontWeight: 'bold',
            }}
            left={props => <List.Icon {...props} icon="file" color={brandPrimary} />}
        />
        </TouchableOpacity>

    );

}


const Course: FC = () => {
    const {
        params
    } = useRoute()

    const {
        colors: {
            brandPrimary
        }
    } = useAppTheme()

    const dispatch = useDispatch()

    useLayoutEffect(() => {
        (async () => {
            //@ts-ignore
            await dispatch(getCourseThunck(params.data))
        })()
    }, [params])

    const { loading, data } = useSelector((store: RootState) => ({
        loading: store.course.loading,
        data: store.course.data
    }))


    return (
        <SafeAreaView style={styles.container}>
            {
                loading ? (
                    <ActivityIndicator color={brandPrimary} size={30} />
                ) : (

                    data.length === 0 ? (
                        <Text style={{fontWeight:"bold", textTransform:"uppercase", textAlign:"center"}}> No Courses available on this subject</Text>
                    ) : (
                        <FlatList
                            data={data}
                            renderItem={({ item }) => <FetchCourse title={item.title} video={item.video} description={item.description} />}
                            keyExtractor={item => item._id}
                        />
                    )
                )
            }
        </SafeAreaView>
    )
}

export default Course

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
});