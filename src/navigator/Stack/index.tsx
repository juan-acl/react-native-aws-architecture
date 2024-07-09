import { createStackNavigator } from "@react-navigation/stack";
import { SignInScreen } from "@/src/screens/SignIn";
import { RoutesNameScreens } from "./nameScreensStack";
import { RootStackParamList } from "../types/navigationStack";
import { SignUpScreen } from "@/src/screens/SignUp";
import { HomeScreen } from "@/src/screens/Home";
import { HotelsScreen } from "@/src/screens/Hotels";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/configureStore";
import { ConfirmEmailScreen } from "@/src/screens/ConfirmEmail";
import { DrawerNavigation } from "../drawer";

const InstanceStackNavigation = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
    const isSignIn = useSelector((state: RootState) => state.reducer.auth.isSignedIn);
    return (
        <InstanceStackNavigation.Navigator
            initialRouteName={!isSignIn ? RoutesNameScreens.Home : RoutesNameScreens.navigationTab}
            screenOptions={({ navigation }) => ({
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                headerTransparent: true,
                headerLeft: () => isSignIn ? null :
                    (
                        <TouchableOpacity
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                marginLeft: 10,
                                height: 50,
                                width: 50,
                                backgroundColor: "#543313",
                                borderRadius: 25,
                            }}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={30}
                                style={{
                                    color: "#fff",
                                }}
                            />
                        </TouchableOpacity>
                    ),
            })}
        >
            <InstanceStackNavigation.Screen
                options={{
                    headerShown: true,
                    title: "Hoteles",
                    headerTitleStyle: {
                        backgroundColor: "#ccc",
                        borderRadius: 20,
                        padding: 12,
                        margin: 10,
                        marginTop: 10,
                        width: "100%",
                        height: "100%",
                        textAlign: "center",
                    },
                }}
                name={RoutesNameScreens.Hotels}
                component={HotelsScreen}
            />
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
                    title: "Confirmación",
                }}
                name={RoutesNameScreens.ConfirmEmail}
                component={ConfirmEmailScreen}
            />
            <InstanceStackNavigation.Screen
                options={{
                    title: "",
                }}
                name={RoutesNameScreens.navigationTab}
                component={DrawerNavigation}
            />
            <InstanceStackNavigation.Screen
                options={{
                    title: "Registrarse",
                }}
                name={RoutesNameScreens.SignUp}
                component={SignUpScreen}
            />
        </InstanceStackNavigation.Navigator>
    );
};
