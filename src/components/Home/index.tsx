import React from "react";
import {View, ImageBackground} from "react-native";
import Buttons from "./Buttons";
import hotel_icon from "@/assets/images/hotels-home.png";
import {HomeProps} from "@/src/navigator/types/navigationStack";
import {styles} from "./styles";

const Home = (props: HomeProps) => {

    return (
        <ImageBackground source={hotel_icon} style={styles.imageBackground}>
            <View style={styles.overlay}/>
            <View style={styles.container}>
                <Buttons {...props} />
            </View>
        </ImageBackground>
    )
}

export default Home;