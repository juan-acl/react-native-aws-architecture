import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { styles } from "./room.styles";
import hotel from "@/assets/images/hotels-home.png";
import { useAppSelector } from "@/src/redux/configureStore";

export const CardRoom = () => {
  const hotelInformation = useAppSelector(
    (state) => state.reducer.hotels.currentHotel
  );

  return (
    <View style={styles.container}>
      <View style={styles.backgroundImage}>
        <ImageBackground source={hotel} style={StyleSheet.absoluteFill} />
      </View>
      <Text style={styles.headtText}>Nombre del la habitacion</Text>
      <View style={styles.informationRoom}>
        <Text style={styles.headtText}>{hotelInformation?.address}</Text>
        <Text style={styles.headtText}>{hotelInformation?.phone}</Text>
      </View>
    </View>
  );
};
