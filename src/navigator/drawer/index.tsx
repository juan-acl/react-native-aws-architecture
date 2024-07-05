import { ProfileScreen } from "@/src/screens/Profile";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackParamList } from "@/src/navigator/types/navigationStack";
import { RoutesNameScreens } from "@/src/navigator/stack/nameScreens";
import { ButtonTabNavigation } from "../tabs";
import { InputFilter } from "@/src/components/InputFilter";

const InstanceDrawerNavigation = createDrawerNavigator<RootStackParamList>();

export const DrawerNavigation = () => {
    return (
        <InstanceDrawerNavigation.Navigator initialRouteName={RoutesNameScreens.DrawerMain} >
            <InstanceDrawerNavigation.Screen
                options={{
                    title: "Hoteles",
                    headerTitle: () => <InputFilter />,
                }}
                name={RoutesNameScreens.DrawerMain}
                component={ButtonTabNavigation}
            />
            <InstanceDrawerNavigation.Screen
                options={{
                    title: "Perfil",
                    headerTitle: ""
                }}
                name={RoutesNameScreens.Profile}
                component={ProfileScreen}
            />
        </InstanceDrawerNavigation.Navigator>
    )
}