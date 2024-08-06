import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./stack";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/configureStore";
import { Loader } from "../components/Loader";
import { View, StyleSheet } from "react-native";

export const RootNavigation = () => {
  const isLoading = useSelector(
    (state: RootState) => state.reducer.loader.isLoading
  );

  return (
    <>
      <NavigationContainer independent={true}>
        {isLoading && (
          <View style={styles.loader_container}>
            <Loader />
          </View>
        )}
        <StackNavigator />
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  loader_container: {
    position: "relative",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
