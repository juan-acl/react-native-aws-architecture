import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, // Esto asegura que la superposición cubra toda el área de la imagen de fondo
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Negro con opacidad del 50%
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 50,
        alignItems: 'center',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,  // Ajusta este valor según necesites
    },
    content: {
        alignItems: 'center',
        marginBottom: 30, // Ajusta este valor según necesites
    },
    containerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    button1: {
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
    },
    button2: {
        backgroundColor: 'white',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
    },
    text1: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text2: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    summary: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
});
