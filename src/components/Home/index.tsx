import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
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
  };


  useEffect(() => {
    fetchHotels();
  }, [])


  return (
    <View>
      {hotels.map(hotel => (
        <View key={hotel.id}>
          <Text>{hotel.name}</Text>
          <Text>{hotel.address}</Text>
          <Text>{hotel.phone}</Text>
        </View>
      ))}
    </View>
  );
};

export default HomePage;
