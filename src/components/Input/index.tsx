import React from 'react';
import {
    TextInput,
    TextInputProps,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet
} from "react-native";

type onChangeProps = {
    value: string;
    name: string;
}

interface InputProps {
    changeValue: ({ value, name }: onChangeProps) => void;
    name: string;
    value: string;
    placeholder: string;
    secureTextEntry?: boolean;
    label?: string;
    hasErrror?: boolean;
    messageError?: string;
    onFocus: ({ name }: { name: string }) => void;
}

export const Input = ({ onFocus, placeholder, value, changeValue, name, secureTextEntry, messageError, hasErrror, label }: InputProps) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={styles.container}>
                {label && <Text style={styles.label}>{label}</Text>}
                <TextInput
                    style={[styles.input, hasErrror && styles.errorInput]}
                    placeholder={placeholder}
                    value={value}
                    onFocus={() => onFocus({ name })}
                    secureTextEntry={secureTextEntry}
                    onChangeText={(text) => changeValue({ value: text, name })}
                    placeholderTextColor="#888"
                />
                {hasErrror && <Text style={styles.errorText}>{messageError}</Text>}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        marginTop: 5,
        color: 'red',
        fontSize: 14,
    },
});
