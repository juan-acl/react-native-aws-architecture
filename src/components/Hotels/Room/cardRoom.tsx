import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { styles } from "./room.styles";
import hotel from "@/assets/images/hotels-home.png";

export const CardRoom = () => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundImage}>
        <ImageBackground source={hotel} style={StyleSheet.absoluteFill} />
      </View>
      <View style={styles.backgroundImage}>
        <Text>Nombre del hotel</Text>
        <Text>Direccion</Text>
        <Text>Precio</Text>
      </View>
    </View>
  );
};
