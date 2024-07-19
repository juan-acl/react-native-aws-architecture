import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootStackParamList } from "@/src/navigator/types/navigationStack";
import { setShowModalHotel } from "@/src/redux/slices/hotel.slice";
import { useAppDispatch } from "@/src/redux/configureStore";

interface DrawerIconProps {
  navigation: DrawerNavigationProp<RootStackParamList>;
  iconName: "menu" | "add";
}

export const DrawerIcon: React.FC<DrawerIconProps> = ({
  navigation,
  iconName,
}) => {
  const dispatch = useAppDispatch();
  return (
    <Pressable
      onPress={() =>
        iconName === "add"
          ? dispatch(setShowModalHotel({ showModalHotel: true }))
          : navigation.toggleDrawer()
      }
    >
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={24} color="#fff" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#543313",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
