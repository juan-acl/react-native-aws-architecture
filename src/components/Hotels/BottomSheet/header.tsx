import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { styles } from "./bottomSheet.styles";
import { PropsHeader } from "types/hotel";

export const Header = (props: PropsHeader) => {
  return (
    <View style={styles.containerHeader}>
      <Ionicons name="heart-outline" size={45} color="white" />
      <Ionicons name="share-social-outline" size={45} color="white" />
    </View>
  );
};
