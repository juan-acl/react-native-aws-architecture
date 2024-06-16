// components/HeaderBackground.tsx
import React from 'react';
import { Image, StyleSheet, ImageBackground } from 'react-native';
import hotelImage from "@/assets/images/hotels-home.png";

export const HeaderBackground: React.FC = () => {
    return (
        <ImageBackground
            source={hotelImage}
            style={StyleSheet.absoluteFillObject}
        />
    );
};

export default HeaderBackground;
