import React from "react";
import { View, Text } from "react-native";
import { styles } from "./profile.styles";

export const Profile: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.text}>It´s a profile component</Text>
      </View>
    </View>
  );
};
