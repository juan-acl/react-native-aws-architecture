import { createStackNavigator } from "@react-navigation/stack";
import { SignInScreen } from "@/src/screens/SignIn";
import { RoutesNameScreens } from "./nameScreens";
import { RootStackParamList } from "../types/navigationStack";
import { SignUpScreen } from "@/src/screens/SignUp";
import { ButtonTabNavigation } from "../tabs";
import { HomeScreen } from "@/src/screens/Home";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/redux/configureStore";
import {InputFilter} from "@/src/components/InputFilter";

const InstanceStackNavigation = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
    const dispatch: AppDispatch = useDispatch();
    return (
        <InstanceStackNavigation.Navigator
            initialRouteName={RoutesNameScreens.Home}
            screenOptions={({ navigation }) => ({
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                headerTransparent: true,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
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
                    title: "",
                    headerTitle: () => (
                        <InputFilter/>
                    ),
                }}
                name={RoutesNameScreens.navigationTab}
                component={ButtonTabNavigation}
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
