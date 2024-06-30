import React from "react";
import {View, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView} from "react-native";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/src/redux/configureStore";
import {SignIn} from "@/src/redux/slices/auth.slice";
import {Input} from '../../Input';
import {FormState, useForm} from "@/src/hooks/useForm";

interface RegisterOnChangeProps {
    value: string;
    name: string;
}

export const Login = () => {
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
    }

    const {state, onChange, isValidaFormState} = useForm(initialState);

    const login = async () => {
        try {
            dispatch(SignIn({emailParams: state.email.value, passwordParams: state.password.value}))
        } catch (e) {
            console.log("error signing in", e);
        }
    };

    const changeValue = ({value, name}: RegisterOnChangeProps) => {
        onChange({value, name});
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='position'
        >
            <Input
                changeValue={changeValue}
                value={state.email.value}
                placeholder='example@example.com'
                name={state.email.name}
                label='Correo electronico'
                autocapitalize={'none'}
                hasErrror={state.email.hasError}
                messageError={state.email.messageError}
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
            <View>
                <TouchableOpacity
                    onPress={login}
                    style={!isValidaFormState ? styles.button_disabled : styles.button_login}
                    disabled={!isValidaFormState}>
                    <Text style={styles.text_login}> Iniciar sesion </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginTop: 70,
    },
    button_login: {
        padding: 20,
        borderRadius: 15,
        backgroundColor: "#543313",
        marginHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
        margin: 20
    },
    button_disabled: {
        padding: 20,
        borderRadius: 15,
        marginHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        backgroundColor: "#ccc",
    },
    text_login: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 17
    }
})
