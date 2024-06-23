import { HotelsScreen } from "@/src/screens/Hotels";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RoutesNameScreensHotelsTabs } from "./nameScreensTabs";
import { RootButtonTabParamList } from "../types/navigationButtonTabs";

const InstabceButtonTabNavigation = createBottomTabNavigator<RootButtonTabParamList>();

export const ButtonTabNavigation = () => {
    return (
        <InstabceButtonTabNavigation.Navigator
            initialRouteName={RoutesNameScreensHotelsTabs.Hotels}
        >
            <InstabceButtonTabNavigation.Screen
                options={{
                    title: "Hoteles",
                }}
                name={RoutesNameScreensHotelsTabs.Hotels}
                component={HotelsScreen}
            />
        </InstabceButtonTabNavigation.Navigator>
    )
}