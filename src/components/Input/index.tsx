import React from "react";
import {
  TextInput,
  View,
  Text,
  Pressable,
  Keyboard,
  KeyboardTypeOptions,
} from "react-native";
import { styles } from "./input.styles";

type onChangeProps = {
  value: string;
  name: string;
};

interface InputProps {
  changeValue: ({ value, name }: onChangeProps) => void;
  name: string;
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
  typeInput?: KeyboardTypeOptions;
  label?: string;
  hasError?: boolean;
  messageError?: string;
  maxLength?: number;
  autocapitalize?: "none" | "sentences" | "words" | "characters";
}

export const Input = ({
  placeholder,
  value,
  changeValue,
  name,
  secureTextEntry,
  messageError,
  hasError,
  label,
  typeInput,
  autocapitalize,
  maxLength,
}: InputProps) => {
  return (
    <Pressable onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          style={[styles.input, hasError && styles.errorInput]}
          placeholder={placeholder}
          value={value}
          secureTextEntry={secureTextEntry}
          onChangeText={(text: string): void =>
            changeValue({ value: text, name })
          }
          placeholderTextColor="#888"
          keyboardType={typeInput}
          maxLength={typeInput === "numeric" ? maxLength : undefined}
          autoCapitalize={autocapitalize}
        />
        {hasError && <Text style={styles.errorText}>{messageError}</Text>}
      </View>
    </Pressable>
  );
};
