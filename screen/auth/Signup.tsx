import { FC, useReducer, useState } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator, } from 'react-native'

import { Text, TextInput, Button, Snackbar } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunck } from '../../store/reducers/thunck';

import { useAppTheme } from '../../theme';
import { SignupSchema } from '../../util/validation';
import { ISignup } from '../../interface/validation.interface';
import { RootState } from '../../store/store';

enum DISPATCH_ACTION_TYPE {
    SHOW_PASSWORD = "SHOW_PASSWORD"
}

interface IFormValue {
    showPassword: boolean
}

const formValues: IFormValue = {
    showPassword: false
}

const formReducer = (state: IFormValue, action: any) => {
    if (action.type === DISPATCH_ACTION_TYPE.SHOW_PASSWORD) {
        return { ...state, showPassword: action.payload }
    }
}


const Signup: FC = () => {
    const navigation = useNavigation()
    const {
        colors: {
            brandPrimary,
            background,
            secondary,
        }
    } = useAppTheme()

    //@ts-ignore
    const [state, dispatch] = useReducer(formReducer, formValues)

    const fetch = useDispatch();

    const [error, setError] = useState<string>("");

    const { loading } = useSelector((store: RootState) => ({
        //token: store.auth.token,
        loading: store.auth.loading,
        //error: store.auth.error
    }))

    //using the use cal back to store the user token
    const storeToken = async (token:string) => {
        await AsyncStorage.setItem('@token', token)
    }


    const submitHandler = async (value: ISignup) => {
        //@ts-ignore
        const response = await fetch(registerThunck({ fullName: value.fullName, email: value.email, password: value.password }))
        
        if (response.payload.status !== "success") {
            if (!response.payload.status) {
                return setError(response.payload)
            }
            setError(response.payload.status)
            return;
        }

        if (response.payload.data) {
            await storeToken(response.payload.data.token)
            return navigation.reset({
                index: 0,
                //@ts-ignore
                routes: [{ name: 'app' }]
            })
        }

    }

    return (
        <SafeAreaView style={{ ...styles.container, backgroundColor: brandPrimary }}>
            <Formik
                initialValues={{ email: "", password: "", fullName: "" }}
                validateOnMount={true}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    submitHandler(values)
                }}
            >
                {
                    ({ handleChange, handleBlur, handleSubmit, errors, isValid, touched, values }) => (
                        <ScrollView>
                            <Text style={{ ...styles.title, color: background }}> Welcome to Tradly </Text>
                            <Text style={{ color: background, ...styles.sub }}> Your Best Learning Platform </Text>

                            <Text style={{ color: background, ...styles.header }}>Create an account</Text>

                            {/** the form */}
                            <View style={styles.form}>
                                <TextInput
                                    autoCorrect={true}
                                    autoCapitalize='words'
                                    cursorColor={brandPrimary}
                                    activeUnderlineColor={brandPrimary}
                                    underlineColorAndroid={brandPrimary}
                                    label={'fullName'}
                                    mode='flat'
                                    style={{ marginVertical: 20 }}
                                    value={values.fullName}
                                    onBlur={handleBlur('fullName')}
                                    onChangeText={handleChange('fullName')}
                                    keyboardType='default'
                                    error={errors.fullName && touched.fullName ? true : false}
                                />


                                <TextInput
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    cursorColor={brandPrimary}
                                    activeUnderlineColor={brandPrimary}
                                    underlineColorAndroid={brandPrimary}
                                    label={'Email'}
                                    mode='flat'
                                    style={{ marginBottom: 20 }}
                                    value={values.email}
                                    onBlur={handleBlur('email')}
                                    onChangeText={handleChange('email')}
                                    keyboardType='email-address'
                                    error={errors.email && touched.email ? true : false}
                                />

                                <TextInput
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    cursorColor={brandPrimary}
                                    activeUnderlineColor={brandPrimary}
                                    label={'Password'}
                                    mode='flat'
                                    style={{ marginBottom: 25 }}
                                    secureTextEntry={state.showPassword}
                                    //@ts-ignore
                                    right={<TextInput.Icon icon="eye" color={(isTextInputFocused: boolean) => isTextInputFocused ? brandPrimary : brandPrimary} onPress={() => dispatch({ type: DISPATCH_ACTION_TYPE.SHOW_PASSWORD, payload: !state.showPassword })} />}
                                    value={values.password}
                                    onBlur={handleBlur('password')}
                                    onChangeText={handleChange('password')}
                                    error={errors.password && touched.password ? true : false}
                                />
                            </View>

                            <View style={{ marginHorizontal: 20 }}>
                                <Button mode='contained-tonal' disabled={!isValid} style={{ padding: 8 }} labelStyle={{ fontWeight: "bold" }} textColor={brandPrimary} onPress={() => handleSubmit()}> Register </Button>
                            </View>

                            <View style={{ marginHorizontal: 20, marginTop: 15 }}>
                                {/*@ts-ignore*/}
                                <Button mode='text' style={{ padding: 8 }} labelStyle={{ fontWeight: "bold" }} textColor={background} onPress={() => navigation.navigate('login')}> Already have an account </Button>
                            </View>


                            {loading && <ActivityIndicator color={background} size={40} style={{ marginTop: 20 }} />}

                        </ScrollView>
                    )
                }
            </Formik>

            {
                error.length > 0 && <Snackbar
                    style={{ marginHorizontal: 20, marginTop: 30 }}
                    visible={error.length ? true : false}
                    onDismiss={() => setError("")}
                    action={{
                        label: 'Undo',
                        onPress: () => {
                            setError("")
                        },
                    }}>
                    {error.toUpperCase()}
                </Snackbar>
            }
        </SafeAreaView>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        letterSpacing: 4,
        textAlign: 'center',
        marginTop: 40
    },

    sub: {
        fontSize: 12,
        fontStyle: 'italic',
        textTransform: 'capitalize',
        textAlign: 'center'
    },

    form: {
        padding: 10,
        marginTop: 20,
        marginHorizontal: 5,
    },

    header: {
        margin: 30,
        textAlign: 'center',
        fontWeight: '800',
        fontStyle: 'italic',

    }
});