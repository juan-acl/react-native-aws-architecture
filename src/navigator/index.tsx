import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./stack";

export const RootNavigation = () => {
    return (
        <NavigationContainer independent={true} >
            <StackNavigator />
        </NavigationContainer>
    )
}