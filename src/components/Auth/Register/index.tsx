import { Text, View } from 'react-native';
import { Input } from '../../Input';
import { useState } from 'react';
import { FormState, useForm } from '@/src/hooks/useForm';

interface RegisterOnChangeProps {
    value: string;
    name: string;
}

export const Register = () => {

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
    const { state, onChange } = useForm(initialState);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const changeValue = ({ value, name }: RegisterOnChangeProps) => {
        onChange({ value, name });
    }

    const onFocus = ({ name }: { name: string }) => {
    }

    return (
        <View >
            <Input
                changeValue={changeValue}
                value={state.email.value}
                placeholder='xxxx.example.com'
                name={state.email.name}
                label='Correo electronico'
                onFocus={onFocus}
                hasErrror={state.email.hasError}
                messageError={state.email.messageError}
            />
            <Input
                changeValue={changeValue}
                value={state.name.value}
                placeholder='Nombre completo'
                name={state.name.name}
                label='Nombre'
                onFocus={onFocus}
                hasErrror={state.name.hasError}
                messageError={state.name.messageError}
            />
            <Input
                changeValue={changeValue}
                value={state.password.value}
                secureTextEntry={true}
                placeholder='******'
                name={state.password.name}
                label='Contraseña'
                onFocus={onFocus}
                hasErrror={state.password.hasError}
                messageError={state.password.messageError}
            />
            <Input
                changeValue={changeValue}
                value={state.lastName.value}
                placeholder='Apellido completo'
                name={state.lastName.name}
                label='Apellido'
                onFocus={onFocus}
                hasErrror={state.lastName.hasError}
                messageError={state.lastName.messageError}
            />
            <Input
                changeValue={changeValue}
                value={state.phone.value}
                placeholder='24456677'
                name={state.phone.name}
                label='Telefono'
                typeInput='numeric'
                onFocus={onFocus}
                hasErrror={state.phone.hasError}
                messageError={state.phone.messageError}
            />
            <Input
                changeValue={changeValue}
                value={state.address.value}
                placeholder='Ciudad de Guatemala, zona 1, 1 calle 1-01'
                name={state.address.name}
                label='Direccion'
                onFocus={onFocus}
                hasErrror={state.address.hasError}
                messageError={state.address.messageError}
            />
        </View>
    )
}