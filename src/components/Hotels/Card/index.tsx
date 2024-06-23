import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import hotel_icon from "@/assets/images/hotels-home.png";

interface CardProps {
    nameHotel: string;
    address: string;
    phone: string;
}

export const Card: React.FC<CardProps> = ({ nameHotel, address, phone }: CardProps) => {
    return (
        <View style={styles.container} >
            <ImageBackground
                source={hotel_icon}
                style={styles.card}
                imageStyle={styles.image}
            >
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
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
    },
    card: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    image: {
        borderRadius: 10,
        objectFit: 'cover',
    },
    container_text: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    leftContainer: {
        flex: 1,
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});

export default Card;
