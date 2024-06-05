import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import * as API from "@/src/helpers/api";

interface Hotel {
  id: number;
  active: boolean;
  updateAt: number;
  createAt: number;
  name: string;
  address: string;
  phone: string;
}

const HomePage: React.FC = () => {

  const [hotels, setHotels] = useState<Hotel[]>([]);

  const fetchHotels = async (): Promise<void> => {
    try {
      const response: any = await API.getHotels();
      setHotels(response.hotels);
    } catch (error) {
      console.log("Error en la peticion ", { error });
    }
  }

  useEffect(() => {
    fetchHotels();
  }, [])


  return (
    <SafeAreaView className="bg-customGray" >
      {hotels.map(hotel => (
        <View key={hotel.id}>
          <Text className="text-customGray" >{hotel.name}</Text>
          <Text style={{ color: "#fff8" }} >{hotel.address}</Text>
          <Text>{hotel.phone}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
};

export default HomePage;
