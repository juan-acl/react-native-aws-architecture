import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RoutesNameScreens } from "../stack/nameScreensStack"

export type RootStackParamList = {
    [RoutesNameScreens.Home]: undefined;
    [RoutesNameScreens.SignIn]: undefined;
    [RoutesNameScreens.SignUp]: undefined;
    [RoutesNameScreens.navigationTab]: undefined;
    [RoutesNameScreens.ConfirmEmail]: undefined;
    [RoutesNameScreens.Hotels]: undefined;
    [RoutesNameScreens.Profile]: undefined;
    [RoutesNameScreens.DrawerMain]: undefined;
}

export type HomeProps = NativeStackScreenProps<RootStackParamList, RoutesNameScreens.Home>