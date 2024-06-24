import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./stack";
import { setIsLoading } from "@/src/redux/slices/loader.slice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/src/redux/configureStore";
import Skeleton from "@/src/components/Skeleton";

export const RootNavigation = () => {
    const dispatch: AppDispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.reducer.loader.isLoading)
    React.useEffect(() => {
        setTimeout(() => {
            dispatch(setIsLoading({ isLoading: false }))
        }, 2000)
    }, [])
    if (isLoading) {
        return <Skeleton/>
    }
    return (
        <NavigationContainer independent={true} >
            <StackNavigator />
        </NavigationContainer>
    )
}