import { createStackNavigator } from "@react-navigation/stack";
import { SignInScreen } from "@/src/screens/SignIn";
import { RoutesNameScreens } from "./nameScreens";
import { RootStackParamList } from "../types/navigationStack";
import { SignUpScreen } from "@/src/screens/SignUp";
import { ButtonTabNavigation } from "../tabs";
import { HomeScreen } from "@/src/screens/Home";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const InstanceStackNavigation = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <InstanceStackNavigation.Navigator
      initialRouteName={RoutesNameScreens.Home}
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#543313",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={30}
              style={{
                marginLeft: 10,
                backgroundColor: "#543313",
                borderRadius: 20,
                padding: 10,
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
          // headerShown: false,
          title: "",
          headerStyle: {
            backgroundColor: "transparent",
          },
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
