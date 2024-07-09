import React from "react";
import { Pressable, Text, View, ScrollView } from "react-native";
import { styles } from "./profile.styles";
import { HeaderBackground } from "./imageBackground";
import { Avatar } from "./imageBackground";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/configureStore";
import { UserInformation } from "@/src/types/auth";
import { SignOut } from "@/src/redux/slices/auth.slice";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/navigator/types/navigationStack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RoutesNameScreens } from "@/src/navigator/stack/nameScreensStack";

export const Profile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  const userProfile: UserInformation | null = useSelector(
    (state: RootState) => state.reducer.auth.userInformation
  );
  const phone_number = userProfile?.phone_number?.split("+502");

  const logOut = async () => {
    const response = await dispatch(SignOut());
    if (!SignOut.fulfilled.match(response)) return;
    navigation.navigate(RoutesNameScreens.Home);
  };

  const updateProfileUser = () => [console.log("Presionado")];

  return (
    <>
      <HeaderBackground />
      <View style={styles.headerContent}>
        <Text style={styles.name}>¡Bienvenido!</Text>
        <Text style={styles.userInfo}>
          {userProfile?.name + " " + userProfile?.family_name}
        </Text>
        <Avatar />
      </View>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.body}>
          <Pressable style={styles.RectangleShapeView}>
            <Text style={styles.headtText}>Correo electronico</Text>
            <Text style={styles.SubjectText}>{userProfile?.email}</Text>
          </Pressable>
          <Pressable style={styles.RectangleShapeView}>
            <Text style={styles.headtText}>Direccion</Text>
            <Text style={styles.SubjectText}>{userProfile?.address}</Text>
          </Pressable>
          <Pressable style={styles.RectangleShapeView}>
            <Text style={styles.headtText}>Numero de telefono</Text>
            <View style={styles.Flex}>
              <Text style={styles.headtText}>+502</Text>
              <Text
                style={{ ...styles.SubjectText, marginLeft: 2, marginTop: 8 }}
              >
                {phone_number}
              </Text>
            </View>
          </Pressable>
          <View style={styles.groupButtons}>
            <TouchableOpacity style={styles.btn} onPress={updateProfileUser}>
              <Text style={styles.text}>Actualizar perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={logOut}>
              <Text style={styles.text}>Cerrar Sesion</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
