import React, {useRef, useState} from 'react';
import {
    NativeSyntheticEvent,
    Text,
    TextInput,
    TextInputKeyPressEventData,
    TouchableOpacity,
    View
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/src/redux/configureStore';
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from '@/src/navigator/types/navigationStack';
import {RoutesNameScreens} from '@/src/navigator/stack/nameScreens';
import {ConfirmSignUp} from '@/src/redux/slices/auth.slice';
import { styles } from './confirmSigUp.styles';

const ConfirmationCodeScreen = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const userEmail = useSelector((state: RootState) => state.reducer.auth.userEmail)
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

    const handleSubmit = async () => {
        try {
            const confirmationCode = code.join('');
            const response = await dispatch(ConfirmSignUp({
                emailParams: userEmail,
                emailCodeConfirmation: confirmationCode
            }));
            if (!ConfirmSignUp.fulfilled.match(response)) return;
            navigation.navigate(RoutesNameScreens.SignIn)
        } catch (error: any) {
            console.log("Error en codeConfirmation" + error.message);
        }
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
                style={isCodeValid ? styles.button : styles.button_disabled}
                onPress={handleSubmit}
                disabled={!isCodeValid}>
                <Text style={styles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ConfirmationCodeScreen;
