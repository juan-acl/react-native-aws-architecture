import { HotelsScreen } from "@/src/screens/Hotels";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RoutesNameScreensHotelsTabs } from "./nameScreensTabs";
import { RootButtonTabParamList } from "../types/navigationButtonTabs";
import { Favorite } from "@/src/components/Hotels/Favorite";
import { Reservation_Screen } from "@/src/screens/Reservations";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/configureStore";
import { setCurrentTabNavigation } from "@/src/redux/slices/hotel.slice";

interface RouteName {
  [key: string]: string;
}

const InstanceButtonTabNavigation =
  createBottomTabNavigator<RootButtonTabParamList>();

const getIconName = (routeName: string) => {
  let iconName = "";
  let mapIconName: RouteName = {
    [RoutesNameScreensHotelsTabs.Hotels]: "home",
    [RoutesNameScreensHotelsTabs.Favorite]: "heart",
    [RoutesNameScreensHotelsTabs.Reservaciones]: "book",
  };
  iconName = mapIconName[routeName];
  return iconName;
};

const getTabBarIcon = (routeName: string, color: string, size: number) => {
  let iconName = getIconName(routeName);
  return (
    <Icon
      name={iconName}
      size={size}
      color={color}
      style={{ marginTop: 10, marginBottom: -5 }}
    />
  );
};

export const ButtonTabNavigation = () => {
  const headerShown = useSelector(
    (state: RootState) => state.reducer.hotels.headerShow,
  );
  return (
    <InstanceButtonTabNavigation.Navigator
      initialRouteName={RoutesNameScreensHotelsTabs.Hotels}
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          display: !headerShown ? "none" : undefined,
          margin: 20,
          borderRadius: 21,
          backgroundColor: "#543313",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
          position: "absolute",
          height: 70,
        },
        headerShown,
        title: "",
        headerTransparent: true,
        tabBarActiveTintColor: "black",
        tabBarActiveBackgroundColor: "white",
        tabBarItemStyle: {
          borderRadius: 20,
        },
        tabBarIcon: ({ color, size }) => getTabBarIcon(route.name, color, size),
      })}
    >
      <InstanceButtonTabNavigation.Screen
        name={RoutesNameScreensHotelsTabs.Hotels}
        component={HotelsScreen}
      />
      <InstanceButtonTabNavigation.Screen
        name={RoutesNameScreensHotelsTabs.Favorite}
        component={Favorite}
      />
      <InstanceButtonTabNavigation.Screen
        name={RoutesNameScreensHotelsTabs.Reservaciones}
        component={Reservation_Screen}
      />
    </InstanceButtonTabNavigation.Navigator>
  );
};
