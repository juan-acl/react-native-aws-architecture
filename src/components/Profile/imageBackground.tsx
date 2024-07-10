import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import background from "@/assets/images/backgroundProfile.png";
import avatar from "@/assets/images/profile.png";
import { styles } from "./profile.styles";

export const HeaderBackground: React.FC = () => {
  return (
    <ImageBackground
      source={background}
      style={StyleSheet.absoluteFillObject}
    />
  );
};

export const Avatar: React.FC = () => {
  return (
    <ImageBackground
      source={avatar}
      style={{ width: 105, height: 105, marginLeft: 2 }}
    />
  );
};
