import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "@/src/screens/Home";
import { SignInScreen } from "@/src/screens/SignIn";
import { RoutesNameScreens } from "./nameScreens";
import { RootStackParamList } from "../types/navigationStack";
import { SignUpScreen } from "@/src/screens/SignUp";

const InstanceStackNavigation = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
    return (
        <InstanceStackNavigation.Navigator
            initialRouteName={RoutesNameScreens.Home}
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#543313',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <InstanceStackNavigation.Screen
                options={{
                    headerShown: false,
                }}
                name={RoutesNameScreens.Home}
                component={HomeScreen}
            />
            <InstanceStackNavigation.Screen
                options={{
                    title: "Iniciar Sesión",
                }}
                name={RoutesNameScreens.SignIn}
                component={SignInScreen}
            />
            <InstanceStackNavigation.Screen
                options={{
                    title: 'Registrarse',
                }}
                name={RoutesNameScreens.SignUp}
                component={SignUpScreen}
            />
        </InstanceStackNavigation.Navigator>
    )
}