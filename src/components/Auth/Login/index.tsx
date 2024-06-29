import React from "react";
import {View, TextInput, Button} from "react-native";
import { signIn, SignInInput } from 'aws-amplify/auth';
import { Authenticator } from '@aws-amplify/ui-react-native';

export const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const login = async () => {
        try {
            const {username, password} = {
                username: "juan@correo.com",
                password: "juan12345",
            };
            const {isSignedIn, nextStep} = await signIn({username, password});
            console.log(isSignedIn, nextStep);
        } catch (e) {
            console.log("error signing in", e);
        }
    };

    const services = {
        async handleSignIn(input: SignInInput) {
            try {
                const user = await signIn(input);
                console.log(user);
                return user;
            } catch (error) {
                console.error(error)
            }

        },
    };

    return (
        <View style={{padding: 20, marginTop: 20}}>
            <TextInput
                style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                    marginTop: 10,
                    padding: 5,
                }}
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                    marginTop: 10,
                    padding: 5,
                }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder="Contraseña"
                secureTextEntry={true}
            />
            <Button
                onPress={login}
                title="Iniciar sesión"
                color="#841584"
                accessibilityLabel="Iniciar sesión"
            />
        </View>
    );
};
