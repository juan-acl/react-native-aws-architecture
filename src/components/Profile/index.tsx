import React, { useCallback, useRef, useState } from "react";
import { Pressable, Text, View, ScrollView, Button } from "react-native";
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
import BottomSheet from "@gorhom/bottom-sheet";
import { ActionSheetUpdateProfile } from "./bottomSheet";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export const Profile: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [expandBottomSheet, setExpandBottomSheet] = useState<boolean>(false);
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

  const updateProfileUser = () => {
    setExpandBottomSheet(true);
    navigation.setOptions({ headerShown: false });
    bottomSheetRef.current?.expand();
  };

  /**
   * This function handles changes in the bottom sheet state and updates the header visibility accordingly.
   *
   * @param {number} index
   * - The index representing the bottom sheet state.
   * - 1 or 2: Bottom sheet is open.
   * - -1: Bottom sheet is closed.
   */
  const onChangeBottomSheet = useCallback((index: number) => {
    if (index === -1) {
      setExpandBottomSheet(false);
      return;
    }
    setExpandBottomSheet(true);
    if (index === 2) return;
    navigation.setOptions({ headerShown: true });
  }, []);

  const onCloseBottomSheet = () => {
    if (!expandBottomSheet) return;
    navigation.setOptions({ headerShown: true });
    setExpandBottomSheet(false);
    bottomSheetRef.current?.close();
  };

  return (
    <>
      <TouchableWithoutFeedback
        style={{
          zIndex: 99999999,
          position: "relative",
          width: "100%",
          height: "100%",
        }}
        onPress={onCloseBottomSheet}
      >
        <HeaderBackground />
        <View style={styles.headerContent}>
          <Text style={styles.name}>¡Bienvenido!</Text>
          <Text style={styles.userInfo}>
            {userProfile?.name + " " + userProfile?.family_name}
          </Text>
          <View style={styles.avatar}>
            <Avatar />
          </View>
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
      </TouchableWithoutFeedback>
      <ActionSheetUpdateProfile
        onChangeBottomSheet={onChangeBottomSheet}
        bottomSheetRef={bottomSheetRef}
      />
    </>
  );
};
