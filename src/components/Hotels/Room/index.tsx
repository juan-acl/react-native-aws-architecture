import React from "react";
import { View } from "react-native";
import { CardRoom } from "./cardRoom";

export const Room = () => {
  return (
    <View style={{ flex: 1, width: "50%", height: "15%" }}>
      <CardRoom />
    </View>
  );
};
