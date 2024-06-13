import React from "react";
import { View, ImageBackground } from "react-native";
import { useFetchHotelsQuery } from "@/src/redux/api/hotel.api";
import Skeleton from "@/src/components/Skeleton"
import Buttons from "./Buttons";
import hotel from "@/assets/images/hotels-home.png";
import { styles } from "./styles";

const Home = () => {

  const { data, error, isLoading } = useFetchHotelsQuery("");

  const login = async () => {
  }

  if (isLoading) return <Skeleton />

  return (
    <ImageBackground source={hotel} style={styles.imageBackground}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Buttons />
      </View>
    </ImageBackground>
  )

}

export default Home;