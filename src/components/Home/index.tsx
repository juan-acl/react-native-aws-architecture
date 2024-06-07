import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useFetchHotelsQuery } from "@/redux/api/hotel.api";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/configureStore";

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

  const { data, error, isLoading } = useFetchHotelsQuery("");
  const hotels = useSelector((state: RootState) => state.reducer.hotels);

  return (
    <SafeAreaView className="bg-customGray" >
      <Text>{isLoading ? "Estamooss cargando" : "Cargado"}</Text>
    </SafeAreaView>
  );
};

export default HomePage;
