import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { signIn, SignInInput, signOut } from 'aws-amplify/auth';

export const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const login = async () => {
        try {
            const { username, password }: SignInInput = {
                username: data.email,
                password: data.password,
            };
            const { isSignedIn, nextStep } = await signIn({
                username,
                password,
                options: {
                    authFlowType: 'USER_PASSWORD_AUTH'
                }
            });
            console.log({ isSignedIn, nextStep });
        } catch (e) {
            console.log("error signing in", e);
        }
    };

    const logOut = async () => {
        try {
            await signOut({ global: true });

        } catch (e) {
            console.log("error signing out: ", e);
        }
    }

    return (
        <View style={{ padding: 20, marginTop: 20 }}>
            <TextInput
                style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                    marginTop: 10,
                    padding: 5,
                }}
                onChangeText={(text) => setData({ ...data, email: text })}
                value={data.email}
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
                onChangeText={(text) => setData({ ...data, password: text })}
                value={data.password}
                placeholder="Contraseña"
                secureTextEntry={true}
            />
            <Button
                onPress={login}
                title="Iniciar sesión"
                color="#841584"
                accessibilityLabel="Iniciar sesión"
            />
            <Button
                onPress={logOut}
                title="Cerrar sesión"
                color="#841584"
                accessibilityLabel="Iniciar sesión"
            />
        </View>
    );
};
