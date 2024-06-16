import { Text, View } from 'react-native';
import { Input } from '../../Input';
import { useState } from 'react';

interface InitialState {
    email: string;
    password: string;
    name: string;
    lastName: string;
    phone: string;
    address: string;
}

export const Register = () => {

    const initialState = {
        email: '',
        password: '',
        name: "",
        lastName: "",
        phone: "",
        address: "",
    }
    const [state, setState] = useState<InitialState>(initialState);

    const changeValue = ({ value, name }: { value: string, name: string }) => {
        setState({ ...state, [name]: value });
    }

    const onFocus = ({ name }: { name: string }) => {
    }

    return (
        <View >
            <Input
                changeValue={changeValue}
                value={state.email}
                placeholder='xxxx.example.com'
                name='email'
                label='Correo electronico'
                onFocus={onFocus}
                hasErrror={true}
                messageError='Correo electronico invalido'
            />
            <Input
                changeValue={changeValue}
                value={state.name}
                placeholder='xxxx.example.com'
                name='name'
                label='Nombre'
                onFocus={onFocus}
                hasErrror={true}
                messageError='Nombre invalido'
            />
            <Input
                changeValue={changeValue}
                value={state.password}
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
                value={state.lastName}
                placeholder='xxxx.example.com'
                name='lastName'
                label='Apellido'
                onFocus={onFocus}
                hasErrror={true}
                messageError='Apellido invalido'
            />
            <Input
                changeValue={changeValue}
                value={state.phone}
                placeholder='xxxx.example.com'
                name='phone'
                label='Telefono'
                onFocus={onFocus}
                hasErrror={true}
                messageError='Telefono invalido'
            />
            <Input
                changeValue={changeValue}
                value={state.address}
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