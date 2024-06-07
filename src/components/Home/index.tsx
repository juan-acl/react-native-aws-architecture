import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import * as API from "@/src/helpers/api";
import { useFetchHotelsQuery } from "@/redux/api/hotel.api";

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
  const { data, error, isLoading } = useFetchHotelsQuery("");

  return (
    <SafeAreaView className="bg-customGray" >
      <Text>{isLoading ? "Estamooss cargando" : "Cargado"}</Text>
    </SafeAreaView>
  );
};

export default HomePage;
