import React, {useRef, useState} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity,
    NativeSyntheticEvent,
    TextInputKeyPressEventData
} from 'react-native';

const ConfirmationCodeScreen = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputs = useRef<(TextInput | null)[]>([]);
    const [isCodeValid, setIsCodeValid] = useState<boolean>(false);

    const handleChangeText = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        // Mover el foco al siguiente input si el texto tiene longitud 1
        if (text.length === 1 && index < inputs.current.length - 1) {
            inputs.current[index + 1]?.focus();
        }
        let validation = newCode.every((digit) => digit.length === 1);
        setIsCodeValid(validation);
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0 && code[index] === '') {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = () => {
        const confirmationCode = code.join('');
        // Aquí debes implementar la lógica para enviar el código al servidor para la verificación
        console.log('Código de confirmación ingresado:', confirmationCode);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verificación de correo electrónico</Text>
            <Text style={styles.infoText}>
                Ingrese el código de confirmación que se le envió al correo electrónico.
            </Text>
            <View style={styles.codeContainer}>
                {code.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(input) => (inputs.current[index] = input)}
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleChangeText(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        placeholder={'-'}
                    />
                ))}
            </View>
            <TouchableOpacity
                style={ isCodeValid ? styles.button : styles.button_disabled}
                onPress={handleSubmit}
                disabled={!isCodeValid} >
                <Text style={styles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: 20,
    },
    button_disabled: {
        marginTop: 20,
        padding: 20,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        backgroundColor: "#ccc",
    },
    title: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    infoText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginBottom: 20,
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center',
        fontSize: 24,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    button: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#543313',
        borderRadius: 15,
        width: '100%',
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ConfirmationCodeScreen;
