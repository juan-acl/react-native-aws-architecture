import { Text, View } from 'react-native';
import { Input } from '../../Input';
import { useState } from 'react';
import { FormState } from '@/src/hooks/useForm';

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
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const changeValue = ({ value, name }: { value: string, name: string }) => {
        // setState({ ...state, [name]: value });
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'name':
                setName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'address':
                setAddress(value);
                break;
        }
    }

    const onFocus = ({ name }: { name: string }) => {
    }

    return (
        <View >
            <Input
                changeValue={changeValue}
                value={email}
                placeholder='xxxx.example.com'
                name='email'
                label='Correo electronico'
                onFocus={onFocus}
                hasErrror={true}
                messageError='Correo electronico invalido'
            />
            <Input
                changeValue={changeValue}
                value={name}
                placeholder='xxxx.example.com'
                name='name'
                label='Nombre'
                onFocus={onFocus}
                hasErrror={true}
                messageError='Nombre invalido'
            />
            <Input
                changeValue={changeValue}
                value={password}
                secureTextEntry={true}
                placeholder='xxxx.example.com'
                name='password'
                label='Contraseña'
                onFocus={onFocus}
                hasErrror={true}
                messageError='Contraseña invalida'
            />
            <Input
                changeValue={changeValue}
                value={lastName}
                placeholder='xxxx.example.com'
                name='lastName'
                label='Apellido'
                onFocus={onFocus}
                hasErrror={true}
                messageError='Apellido invalido'
            />
            <Input
                changeValue={changeValue}
                value={phone}
                placeholder='xxxx.example.com'
                name='phone'
                label='Telefono'
                onFocus={onFocus}
                hasErrror={true}
                messageError='Telefono invalido'
            />
            <Input
                changeValue={changeValue}
                value={address}
                placeholder='xxxx.example.com'
                name='address'
                label='Direccion'
                onFocus={onFocus}
                hasErrror={true}
                messageError='Direccion invalida'
            />
        </View>
    )
}