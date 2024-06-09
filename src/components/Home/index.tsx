import React from "react";
import { View, Text, Button } from "react-native";
import { useFetchHotelsQuery } from "@/src/redux/api/hotel.api";
import Skeleton from "@/src/components/Skeleton"
import { autoSignIn, signIn } from "aws-amplify/auth"

const Home = () => {

  const { data, error, isLoading } = useFetchHotelsQuery("");

  const login = async () => {
  }

  if (isLoading) return <Skeleton />

  return (
    <View>
      <Text>Ya se cargaron los hoteles</Text>
      <Button title="Login" onPress={login} />
    </View>
  )

}

export default Home;