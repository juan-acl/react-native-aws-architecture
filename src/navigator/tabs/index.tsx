import { HotelsScreen } from "@/src/screens/Hotels";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RoutesNameScreensHotelsTabs } from "./nameScreensTabs";
import { RootButtonTabParamList } from "../types/navigationButtonTabs";
import { Favorite } from "@/src/components/Hotels/Favorite";
import { Reservation_Screen } from "@/src/screens/Reservations";

const InstabceButtonTabNavigation = createBottomTabNavigator<RootButtonTabParamList>();

export const ButtonTabNavigation = () => {
    return (
        <InstabceButtonTabNavigation.Navigator
            initialRouteName={RoutesNameScreensHotelsTabs.Hotels}
            screenOptions={{
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "normal",
                    margin: 10,
                },
                tabBarStyle: {
                    margin: 10,
                    borderRadius: 10,
                    backgroundColor: "gray",
                },
                tabBarInactiveTintColor: "white",
                tabBarActiveTintColor: "black",
                tabBarActiveBackgroundColor: "white",
            }}
        >
            <InstabceButtonTabNavigation.Screen
                options={{
                    headerShown: false,
                    title: "Hoteles",
                }}
                name={RoutesNameScreensHotelsTabs.Hotels}
                component={HotelsScreen}
            />
            <InstabceButtonTabNavigation.Screen
                options={{
                    headerShown: false,
                    title: "Favoritos",
                }}
                name={RoutesNameScreensHotelsTabs.Favorite}
                component={Favorite}
            />
            <InstabceButtonTabNavigation.Screen
                options={{
                    headerShown: false,
                    title: "Mis reservaciones",
                }}
                name={RoutesNameScreensHotelsTabs.Reservaciones}
                component={Reservation_Screen}
            />
        </InstabceButtonTabNavigation.Navigator>
    )
}