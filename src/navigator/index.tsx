import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {StackNavigator} from "./stack";
import {useSelector} from "react-redux";
import {RootState} from "@/src/redux/configureStore";
import Skeleton from "@/src/components/Skeleton";

export const RootNavigation = () => {
    const isLoading: boolean = useSelector((state: RootState) => state.reducer.loader.isLoading);

    return (
        <>
            <NavigationContainer independent={true}>
                <StackNavigator/>
            </NavigationContainer>
            {isLoading && <Skeleton/>}
        </>
    );
};
