import { ProfileScreen } from "@/src/screens/Profile";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { RootStackParamList } from "@/src/navigator/types/navigationStack";
import { RoutesNameScreens } from "@/src/navigator/stack/nameScreensStack";
import { ButtonTabNavigation } from "../tabs";
import { InputFilter } from "@/src/components/InputFilter";
import { DrawerIcon } from "./drawerIcon";
import { useSelector } from "react-redux";
import { RootState, useAppSelector } from "@/src/redux/configureStore";

const InstanceDrawerNavigation = createDrawerNavigator<RootStackParamList>();

export const DrawerNavigation = () => {
  const headerShown = useSelector(
    (state: RootState) => state.reducer.hotels.headerShow,
  );
  const currentScreenTabNavigation = useAppSelector(
    (state) => state.reducer.hotels.currentScreenTabNavigation,
  );
  return (
    <InstanceDrawerNavigation.Navigator
      initialRouteName={RoutesNameScreens.DrawerMain}
      screenOptions={({ navigation, route }) => ({
        headerShow: headerShown,
        headerTransparent: true,
        headerTitleAlign: "center",
        headerRight: () => {
          let component =
            route.name === "DrawerMain_Screen" && currentScreenTabNavigation ? (
              <DrawerIcon navigation={navigation} iconName="add" />
            ) : null;
          return component;
        },
        headerLeft: () => (
          <DrawerIcon navigation={navigation} iconName="menu" />
        ),
        headerLeftContainerStyle: {
          padding: 10,
        },
        headerStyle: {
          height: 63,
        },
        headerTintColor: "#fff",
      })}
    >
      <InstanceDrawerNavigation.Screen
        options={{
          headerTitleAlign: "center",
          title: "Hoteles",
          headerShown,
          headerTitle: () => <InputFilter />,
        }}
        name={RoutesNameScreens.DrawerMain}
        component={ButtonTabNavigation}
      />
      <InstanceDrawerNavigation.Screen
        options={{
          title: "Perfil",
          headerTitle: "",
        }}
        name={RoutesNameScreens.Profile}
        component={ProfileScreen}
      />
    </InstanceDrawerNavigation.Navigator>
  );
};
