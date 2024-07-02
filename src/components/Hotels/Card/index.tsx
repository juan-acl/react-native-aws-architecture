import React from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import hotel_icon from "@/assets/images/hotels-home.png";
import {Ionicons} from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface CardProps {
    nameHotel: string;
    address: string;
    phone: string;
    showActionSheet: () => void;
}

export const Card: React.FC<CardProps> = ({nameHotel, address, phone, showActionSheet}: CardProps) => {
    return (
        <TouchableWithoutFeedback onPress={showActionSheet} >
            <View style={styles.container}>
                <ImageBackground
                    source={hotel_icon}
                    style={styles.card}
                    imageStyle={styles.image}
                >
                    <TouchableOpacity style={styles.iconContainer}>
                        <Ionicons
                            name={"heart"}
                            size={30}
                            color={"red"}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <View style={styles.container_text}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.text}>{nameHotel}</Text>
                            <Text style={styles.text}>{address}</Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <Text style={styles.text}>{phone}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback >
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 5,
        padding: 5,
    },
    card: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        position: 'relative',
    },
    image: {
        borderRadius: 10,
        objectFit: 'cover',
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: "#543313",
        borderRadius: 20,
        padding: 5,
    },
    icon: {
        color: "#fff",
    },
    container_text: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 10,
    },
    leftContainer: {
        flex: 1,
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});

export default Card;
