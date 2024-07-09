import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container_register: {
        flexGrow: 1,
        justifyContent: "center",
    },
    buttonContainer: {
        width: '90%',
        alignItems: 'center',
        marginTop: 20,
        margin: 20,
        padding: 1
    },
    button_register: {
        padding: 20,
        borderRadius: 15,
        backgroundColor: "#543313",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
    },
    button_disabled: {
        padding: 20,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        backgroundColor: "#ccc",
    },
    text_register: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 17
    }
})