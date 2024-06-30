import {Text, View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {Input} from '../../Input';
import {FormState, useForm} from '@/src/hooks/useForm';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RoutesNameScreens} from '@/src/navigator/stack/nameScreens';
import {RootStackParamList} from '@/src/navigator/types/navigationStack';
import {signUp} from "aws-amplify/auth"

interface RegisterOnChangeProps {
    value: string;
    name: string;
}

export const Register = () => {
    const navigate = useNavigation<NavigationProp<RootStackParamList>>()

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

    const register = () => {
        signUp({
            username: state.email.value,
            password: state.password.value,
            options: {
                userAttributes: {
                    email: state.email.value,
                    name: state.name.value,
                    family_name: state.lastName.value,
                    phone_number: "+502 " + state.phone.value,
                    address: state.address.value,
                }
            }
        }).then(() => {
            navigate.navigate(RoutesNameScreens.SignIn)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
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
                placeholder='******'
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
            <View>
                <TouchableOpacity
                    onPress={register}
                    style={!isValidaFormState ? styles.button_disabled : styles.button_register}
                    disabled={!isValidaFormState}>
                    <Text style={styles.text_register}> Registrarse </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container_register: {
        flex: 1,
        justifyContent: "center",
    },
    button_register: {
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
    text_register: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 17
    }
})