import React from "react";
import {View, TouchableOpacity, Text, StyleSheet} from "react-native";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/src/redux/configureStore";
import {SignIn, SignOut} from "@/src/redux/slices/auth.slice";
import {Input} from '../../Input';
import {FormState, useForm} from "@/src/hooks/useForm";
import {useFocusEffect} from "@react-navigation/native";

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

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                dispatch(SignOut());
            };
        }, [])
    );

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
        <View style={{padding: 20, marginTop: 20}}>
            <Input
                changeValue={changeValue}
                value={state.email.value}
                placeholder='xxxx.example.com'
                name={state.email.name}
                label='Correo electronico'
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
                <TouchableOpacity onPress={login}
                                  style={!isValidaFormState ? styles.button_disabled : styles.button_login}
                                  disabled={!isValidaFormState}>
                    <Text style={styles.text_login}> Iniciar sesion </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
