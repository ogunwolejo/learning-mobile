import { FC, useLayoutEffect, useMemo, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'

import { ActivityIndicator, Text, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { Category } from '../../component/category'
import { useAppTheme } from '../../theme'
import { RootState } from '../../store/store'
import { getCategoriesThunck } from '../../store/reducers/thunck'
import { useDispatch } from 'react-redux'

const Explore: FC = () => {
    const {
        colors: {
            backdrop,
            brandPrimary,
            background
        }
    } = useAppTheme()

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        (async () => {
            //@ts-ignore
            await dispatch(getCategoriesThunck(null))
        })();
    }, [])


    const { list, loading } = useSelector((store: RootState) => ({
        list: store.category.list,
        loading: store.category.loading
    }))

    const [searchCategory, setSearchCategory] = useState<string>('')

    const AppCategory = useMemo(() => {
        if (searchCategory.trim().length > 0) {
            const data: Array<{ category: string; _id: string }> = [];

            list.forEach((el) => {
                const isTrue = el.category.toLowerCase().includes(searchCategory.toLowerCase())

                if (isTrue) {
                    data.push({
                        category: el.category,
                        _id: el._id
                    })
                }
            })

            return data
        }

        if (searchCategory.trim().length == 0) {
            return list
        }
    }, [searchCategory, list])


    const searchHandler = (value: string) => {
        setSearchCategory(value)
    }

    return (
        <SafeAreaView style={{ ...styles.container, backgroundColor: background }}>
            <Text style={{ ...styles.header }}> Explore Categories </Text>
            <TextInput
                mode='outlined'
                style={{ marginTop: 2, marginBottom: 10 }}
                placeholder='Search'
                left={<TextInput.Icon icon="magnify" />}
                activeOutlineColor={brandPrimary}
                onChangeText={text => searchHandler(text)}
            />
            <ScrollView>
                {
                    loading ? (
                        <ActivityIndicator style={{ marginTop: 20 }} color={brandPrimary} size={30} />
                    ) : (
                        AppCategory?.map((el, index: number) => {
                            const i = el.category.split('')
                            i[0] = i[0].toUpperCase()
                            const title: string = i.join('')
                            return (<Category title={title} id={el._id} key={index} />)
                        })
                    )
                }

            </ScrollView>
        </SafeAreaView>
    )
}

export default Explore

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 2,
        padding: 10,
        //justifyContent: 'center',
    },
    header: {
        fontWeight: "bold",
        fontSize: 22,
    }
});