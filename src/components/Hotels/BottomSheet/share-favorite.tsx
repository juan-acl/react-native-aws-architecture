import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { styles } from "./bottomSheet.styles";
import { PropsHeader } from "types/hotel";
import { useAppSelector } from "@/src/redux/configureStore";

export const Header = (props: PropsHeader) => {
  const isHotelFavorite = useAppSelector(
    (state) => state.reducer.hotels.isHotelFavorite
  );

  return (
    <View style={styles.containerHeader}>
      <Pressable onPress={props.onClickAddFavorite}>
        <Ionicons
          name={isHotelFavorite ? "heart" : "heart-outline"}
          size={35}
          color="white"
        />
      </Pressable>
      <Pressable onPress={props.onClickShare}>
        <Ionicons name="share-social-outline" size={35} color="white" />
      </Pressable>
    </View>
  );
};
