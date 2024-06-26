import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RoutesNameScreens } from "../stack/nameScreens"

export type RootStackParamList = {
    [RoutesNameScreens.Home]: undefined;
    [RoutesNameScreens.SignIn]: undefined;
    [RoutesNameScreens.SignUp]: undefined;
    [RoutesNameScreens.navigationTab]: undefined;
    [RoutesNameScreens.ConfirmEmail]: undefined;
}

export type HomeProps = NativeStackScreenProps<RootStackParamList, RoutesNameScreens.Home>