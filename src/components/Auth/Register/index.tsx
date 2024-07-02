import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Input} from '../../Input';
import {FormState, useForm} from '@/src/hooks/useForm';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RoutesNameScreens} from '@/src/navigator/stack/nameScreens';
import {RootStackParamList} from '@/src/navigator/types/navigationStack';
import {SignUp, setUserEmail} from "@/src/redux/slices/auth.slice"
import {AppDispatch} from "@/src/redux/configureStore";
import {useDispatch} from "react-redux";

interface RegisterOnChangeProps {
    value: string;
    name: string;
}

export const Register = () => {
    const navigate = useNavigation<NavigationProp<RootStackParamList>>()
    const dispatch: AppDispatch = useDispatch();
    const initialState: FormState = {
        email: {
            value: "",
            hasError: false,
            name: "email",
            messageError: "",
            isFormInvalid: false,
        },
        password: {
            value: "",
            hasError: false,
            name: "password",
            messageError: "",
            isFormInvalid: false,
        },
        name: {
            value: "",
            hasError: false,
            name: "name",
            messageError: "",
            isFormInvalid: false,
        },
        lastName: {
            value: "",
            hasError: false,
            name: "lastName",
            messageError: "",
            isFormInvalid: false,
        },
        phone: {
            value: "",
            hasError: false,
            name: "phone",
            messageError: "",
            isFormInvalid: false,
        },
        address: {
            value: "",
            hasError: false,
            name: "address",
            messageError: "",
            isFormInvalid: false
        },
    }

    const {state, onChange, isValidaFormState} = useForm(initialState);

    const changeValue = ({value, name}: RegisterOnChangeProps) => {
        onChange({value, name});
    }

    const register = async () => {
        try {
            const response = await dispatch(SignUp({
                emailParams: state.email.value,
                passwordParams: state.password.value,
                nameParams: state.name.value,
                lastNameParams: state.lastName.value,
                phoneNumberParams: state.phone.value,
                addressParams: state.address.value,
            }))
            if (SignUp.fulfilled.match(response)) {
                dispatch(setUserEmail(state.email.value))
                navigate.navigate(RoutesNameScreens.ConfirmEmail)
            } else {
                console.log("Es la respuesta " + SignUp.rejected.match(response))

            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <KeyboardAvoidingView
            style={{flex: 1, justifyContent: 'center', marginTop: 70}}
            behavior='padding'
            keyboardVerticalOffset={64}
        >
            <ScrollView
                contentContainerStyle={styles.container_register}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <Input
                    changeValue={changeValue}
                    value={state.email.value}
                    placeholder='example@example.com'
                    name={state.email.name}
                    label='Correo electronico'
                    autocapitalize='none'
                    hasErrror={state.email.hasError}
                    messageError={state.email.messageError}
                />
                <Input
                    changeValue={changeValue}
                    value={state.name.value}
                    placeholder='Nombre completo'
                    name={state.name.name}
                    label='Nombre'
                    hasErrror={state.name.hasError}
                    messageError={state.name.messageError}
                />
                <Input
                    changeValue={changeValue}
                    value={state.lastName.value}
                    placeholder='Apellido completo'
                    name={state.lastName.name}
                    label='Apellido'
                    hasErrror={state.lastName.hasError}
                    messageError={state.lastName.messageError}
                />
                <Input
                    changeValue={changeValue}
                    value={state.password.value}
                    secureTextEntry={true}
                    placeholder='********'
                    name={state.password.name}
                    label='Contraseña'
                    hasErrror={state.password.hasError}
                    messageError={state.password.messageError}
                />
                <Input
                    changeValue={changeValue}
                    value={state.phone.value}
                    placeholder='24456677'
                    name={state.phone.name}
                    label='Telefono'
                    typeInput='numeric'
                    maxLength={8}
                    hasErrror={state.phone.hasError}
                    messageError={state.phone.messageError}
                />
                <Input
                    changeValue={changeValue}
                    value={state.address.value}
                    placeholder='Ciudad de Guatemala, zona 1, 1 calle 1-01'
                    name={state.address.name}
                    label='Direccion'
                    hasErrror={state.address.hasError}
                    messageError={state.address.messageError}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={register}
                        style={!isValidaFormState ? styles.button_disabled : styles.button_register}
                        disabled={!isValidaFormState}>
                        <Text style={styles.text_register}> Registrarse </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container_register: {
        flexGrow: 1,
        justifyContent: "center",
    },
    buttonContainer: {
        width: '90%',
        alignItems: 'center',
        marginTop: 20,
        margin: 20,
        padding: 1
    },
    button_register: {
        padding: 20,
        borderRadius: 15,
        backgroundColor: "#543313",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
    },
    button_disabled: {
        padding: 20,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        backgroundColor: "#ccc",
    },
    text_register: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 17
    }
})