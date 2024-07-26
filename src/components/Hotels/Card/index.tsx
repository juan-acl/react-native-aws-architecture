import React from "react";
import { View, Text, ImageBackground, Pressable } from "react-native";
import hotel_icon from "@/assets/images/hotels-home.png";
import { useAppDispatch, useAppSelector } from "@/src/redux/configureStore";
import { DialogAlert } from "@/src/redux/slices/dialogAlert.slice";
import { ALERT_TYPE } from "react-native-alert-notification";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/navigator/types/navigationStack";
import { RoutesNameScreens } from "@/src/navigator/stack/nameScreensStack";
import { styles } from "./card.styles";
import { Hotel } from "@/src/types/hotel";
import {
  setHotelInformationBottomSheet,
  getIsFavoriteHotelByUser,
} from "@/src/redux/slices/hotel.slice";

interface CardProps {
  hotelInformation: Hotel;
  showActionSheet?: () => void;
}

export const Card: React.FC<CardProps> = ({
  showActionSheet,
  hotelInformation,
}: CardProps) => {
  const isSignedIn = useAppSelector((state) => state.reducer.auth.isSignedIn);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(
    (state) => state.reducer.auth.userInformation
  );
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const openActionSheet = () => {
    if (!showActionSheet) return;
    if (!isSignedIn) {
      dispatch(
        DialogAlert({
          typeAlert: ALERT_TYPE.WARNING,
          message: "Debes iniciar sesión para poder realizar esta acción",
          title: "Ups! No has iniciado sesión",
          textButton: "Ir al login",
          afterClose: () => {
            navigation.navigate(RoutesNameScreens.SignIn);
          },
        })
      );
      return;
    }
    showActionSheet();
    dispatch(setHotelInformationBottomSheet(hotelInformation));
    dispatch(
      getIsFavoriteHotelByUser({
        idHotel: hotelInformation?.PK || "",
        idUser: currentUser?.sub || "",
      })
    );
  };

  return (
    <Pressable onPress={openActionSheet}>
      <View style={styles.container}>
        <ImageBackground
          source={hotel_icon}
          style={styles.card}
          imageStyle={styles.image}
        >
          <View style={styles.container_text}>
            <View style={styles.leftContainer}>
              <Text style={styles.text}>{hotelInformation?.name}</Text>
              <Text style={styles.text}>{hotelInformation?.address}</Text>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.text}>{hotelInformation?.phone}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </Pressable>
  );
};

export default Card;
