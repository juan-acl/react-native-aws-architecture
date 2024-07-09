import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from "@/src/navigator/types/navigationStack";

interface DrawerIconProps {
    navigation: DrawerNavigationProp<RootStackParamList>;
}

export const DrawerIcon: React.FC<DrawerIconProps> = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <View style={styles.iconContainer}>
                <Ionicons name="menu" size={24} color="#fff" />
            </View>
        </TouchableOpacity>
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
