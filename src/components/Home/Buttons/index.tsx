import React from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "../styles";

const Buttons = () => {
    return (
        <>
            <View style={styles.header}>
                <Text style={styles.title}>MrHotel</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>Reservaciones fáciles</Text>
                <Text style={styles.summary}>¡Busca los mejores hoteles para pasar unas buenas vacaciones!</Text>
            </View>
            <View style={styles.containerButtons}>
                <Pressable style={styles.button2}>
                    <Text style={styles.text1}>Regístrate</Text>
                </Pressable>
                <Pressable style={styles.button1}>
                    <Text style={styles.text2}>Iniciar Sesión</Text>
                </Pressable>
            </View>
        </>
    );
};

export default Buttons;
