import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as API from "@/src/helpers/api";
import axios from "axios";

const HomePage: React.FC = () => {
  const [hotels, setHotels] = useState([]);

  const fetchHotels = async () => {
    try {
      const response = await API.getHotels()
    } catch (error) {
      console.log("Error en la peticion ", { error })
    }
  }

  useEffect(() => {
    fetchHotels();
  }, [])


  return (
    <View>
      <Text>Home Page</Text>
    </View>
  );
};

export default HomePage;
