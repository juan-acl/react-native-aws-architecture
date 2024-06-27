import {HotelsScreen} from "@/src/screens/Hotels";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {RoutesNameScreensHotelsTabs} from "./nameScreensTabs";
import {RootButtonTabParamList} from "../types/navigationButtonTabs";
import {Favorite} from "@/src/components/Hotels/Favorite";
import {Reservation_Screen} from "@/src/screens/Reservations";
import Icon from "react-native-vector-icons/FontAwesome";

const InstanceButtonTabNavigation = createBottomTabNavigator<RootButtonTabParamList>();

const getTabBarIcon = (routeName: string, color: string, size: number) => {
    let iconName = "";
    let mapIconName = {
        [RoutesNameScreensHotelsTabs.Hotels]: "home",
        [RoutesNameScreensHotelsTabs.Favorite]: "heart",
        [RoutesNameScreensHotelsTabs.Reservaciones]: "book",
    }
    // @ts-ignore
    iconName = mapIconName[routeName]
    return <Icon name={iconName} size={size} color={color} style={{marginTop: 10, marginBottom: -5}}/>;
};

export const ButtonTabNavigation = () => {
    return (
        <InstanceButtonTabNavigation.Navigator
            initialRouteName={RoutesNameScreensHotelsTabs.Hotels}
            screenOptions={({route}) => ({
                tabBarStyle: {
                    margin: 20,
                    borderRadius: 11,
                    backgroundColor: "#543313",
                    shadowOffset: {
                        width: 0,
                        height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.0,
                    elevation: 24,
                    borderTopLeftRadius: 21,
                    borderTopRightRadius: 21,
                    position: 'absolute',
                    height: 70,
                },
                title: "",
                headerTransparent: true,
                tabBarActiveTintColor: "black",
                tabBarActiveBackgroundColor: "white",
                tabBarItemStyle: {
                    borderRadius: 10,
                },
                tabBarIcon: ({color, size}) => getTabBarIcon(route.name, color, size),
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
