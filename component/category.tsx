import { memo, FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { List } from 'react-native-paper'
import { useAppTheme } from '../theme';
import { useNavigation } from '@react-navigation/native';


const CategoryComponent: FC<{ title: string; id: string }> = ({ title, id }) => {
    const {
        colors: {
            brandPrimary
        }
    } = useAppTheme()

    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => {
            //@ts-ignore
            navigation.navigate('course', {
                data:id
            })
        }}>
            <List.Item
                title={title}
                titleStyle={{
                    color: brandPrimary,
                    fontWeight: '700',
                    fontSize: 16
                }}
                style={{ paddingVertical: 8, marginVertical: 2 }}
                //right={props => <List.Icon icon="chevron-right" />}
                left={props => <List.Icon {...props} icon="folder" color={brandPrimary} />}
            />
        </TouchableOpacity>
    )
}

export const Category = memo(CategoryComponent)