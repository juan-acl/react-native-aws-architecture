import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./Stack";

export const RootNavigation = () => {
    return (
        <NavigationContainer independent={true} >
            <StackNavigator />
        </NavigationContainer>
    )
}