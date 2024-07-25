import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import { styles } from "./bottomSheet.styles";
import { PropsHeader } from "types/hotel";

export const Header = (props: PropsHeader) => {
  return (
    <View style={styles.containerHeader}>
      <Pressable onPress={props.onClickAddFavorite}>
        <Ionicons name="heart-outline" size={35} color="white" />
      </Pressable>
      <Pressable onPress={props.onClickShare}>
        <Ionicons name="share-social-outline" size={35} color="white" />
      </Pressable>
    </View>
  );
};
