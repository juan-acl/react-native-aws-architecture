import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useFetchHotelsQuery } from "@/src/redux/api/hotel.api";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/configureStore";
import SkeletonLoader from "@/src/components/Skeleton"

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

  if (isLoading) return <SkeletonLoader />

  return (
    <SafeAreaView>
      <Text>Cargadoo</Text>
    </SafeAreaView>
  );

};

export default HomePage;
