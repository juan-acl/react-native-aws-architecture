import React from 'react';
import { View, Text, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import hotel_icon from "@/assets/images/hotels-home.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/src/redux/configureStore";
import { DialogAlert } from '@/src/redux/slices/dialogAlert.slice';
import { ALERT_TYPE } from "react-native-alert-notification";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/navigator/types/navigationStack";
import { RoutesNameScreens } from "@/src/navigator/stack/nameScreens";
import { styles } from './card.styles';

interface CardProps {
    nameHotel: string;
    address: string;
    phone: string;
    showActionSheet?: () => void;
}

export const Card: React.FC<CardProps> = ({ nameHotel, address, phone, showActionSheet }: CardProps) => {
    const isSignedIn = useSelector((state: RootState) => state.reducer.auth.isSignedIn);
    const dispatch: AppDispatch = useDispatch();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const openActionSheet = () => {
        if (!showActionSheet) return;
        if (!isSignedIn) {
            dispatch(DialogAlert({
                typeAlert: ALERT_TYPE.WARNING,
                message: "Debes iniciar sesión para poder realizar esta acción",
                title: "Ups! No has iniciado sesión",
                textButton: "Ir al login",
                afterClose: () => {
                    navigation.navigate(RoutesNameScreens.SignIn);
                }
            }))
            return
        }
        showActionSheet();
    }

    return (
        <TouchableWithoutFeedback onPress={openActionSheet} >
            <View style={styles.container} >
                <ImageBackground
                    source={hotel_icon}
                    style={styles.card}
                    imageStyle={styles.image}
                >
                    <View style={styles.container_text}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.text}>{nameHotel}</Text>
                            <Text style={styles.text}>{address}</Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <Text style={styles.text}>{phone}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback >
    );
};

export default Card;
