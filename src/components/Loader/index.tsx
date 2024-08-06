import React from "react";
import { View } from "react-native";
import { BarIndicator } from "react-native-indicators";

export const Loader: React.FC = () => {
  return (
    <View>
      <BarIndicator color="white" size={60} />
    </View>
  );
};
