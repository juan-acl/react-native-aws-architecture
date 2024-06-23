import { createStackNavigator } from "@react-navigation/stack";
import { SignInScreen } from "@/src/screens/SignIn";
import { RoutesNameScreens } from "./nameScreens";
import { RootStackParamList } from "../types/navigationStack";
import { SignUpScreen } from "@/src/screens/SignUp";
import { ButtonTabNavigation } from "../tabs";
import { HomeScreen } from "@/src/screens/Home";


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
                    headerShown: false, // Tengo como componente una navegacion por tabs nuevo y el header solo aplica para el stack si se necesita realizar otra cosa se hace desde el tab
                }}
                name={RoutesNameScreens.navigationTab}
                component={ButtonTabNavigation}
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