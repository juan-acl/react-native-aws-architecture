import { HotelsScreen } from "@/src/screens/Hotels";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RoutesNameScreensHotelsTabs } from "./nameScreensTabs";
import { RootButtonTabParamList } from "../types/navigationButtonTabs";
import { Favorite } from "@/src/components/Hotels/Favorite";
import { Reservation_Screen } from "@/src/screens/Reservations";
import Icon from "react-native-vector-icons/FontAwesome";

const InstabceButtonTabNavigation = createBottomTabNavigator<
  RootButtonTabParamList
>();

export const ButtonTabNavigation = () => {
  return (
    <InstabceButtonTabNavigation.Navigator
      initialRouteName={RoutesNameScreensHotelsTabs.Hotels}
      screenOptions={({}) => ({
        tabBarStyle: {
          margin: 20,
          borderRadius: 11,
          display: "flex",
          backgroundColor: "#543313",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        },
        headerTransparent: true,
        tabBarInactiveTintColor: "white",
        tabBarActiveTintColor: "black",
        tabBarActiveBackgroundColor: "white",
        tabBarItemStyle: {
          borderRadius: 10,
        },
      })}
    >
      <InstabceButtonTabNavigation.Screen
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="home"
              size={size}
              color={color}
              style={{ marginTop: 10, marginBottom: -5 }}
            />
          ),
        }}
        name={RoutesNameScreensHotelsTabs.Hotels}
        component={HotelsScreen}
      />
      <InstabceButtonTabNavigation.Screen
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="heart"
              size={size}
              color={color}
              style={{ marginTop: 10, marginBottom: -5 }}
            />
          ),
        }}
        name={RoutesNameScreensHotelsTabs.Favorite}
        component={Favorite}
      />
      <InstabceButtonTabNavigation.Screen
        options={{
          headerShown: false,
          title: "",
          tabBarStyle: {
            paddingTop: 50,
            height: 50,
          },
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="book"
              size={size}
              color={color}
              style={{ marginTop: 10, marginBottom: -5 }}
            />
          ),
        }}
        name={RoutesNameScreensHotelsTabs.Reservaciones}
        component={Reservation_Screen}
      />
    </InstabceButtonTabNavigation.Navigator>
  );
};
