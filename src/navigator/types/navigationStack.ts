import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RoutesNameScreens } from "../Stack/nameScreens"

export type RootStackParamList = {
    [RoutesNameScreens.Home]: undefined;
    [RoutesNameScreens.SignIn]: undefined;
    [RoutesNameScreens.SignUp]: undefined;
}

export type HomeProps = NativeStackScreenProps<RootStackParamList, RoutesNameScreens.Home>