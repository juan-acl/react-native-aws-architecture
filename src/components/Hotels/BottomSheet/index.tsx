import React, { useMemo, useCallback } from "react";
import { Text, Pressable, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/configureStore";
import { setCleanCurrentHotel } from "@/src/redux/slices/hotel.slice";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Input } from "@/src/components/Input";
import { RootStackParamList } from "@/src/navigator/types/navigationStack";
import { setHeaderShow } from "@/src/redux/slices/hotel.slice";
import { FormState, useForm } from "@/src/hooks/useForm";
import { styles } from "./bottomSheet.styles";
import {
  PropsBottomSheetHoteles,
  RegisterOnChangeProps,
} from "@/src/types/hotel";

export const ActionSheetHotel: React.FC<PropsBottomSheetHoteles> = ({
  bottomSheetRef,
}: PropsBottomSheetHoteles) => {
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  const hotelInformation = useSelector(
    (state: RootState) => state.reducer.hotels.currentHotel,
  );
  const snapPoints = useMemo(() => [0.1, "50%", "100%"], []);

  const initialState: FormState = {
    email: {
      value: "",
      hasError: false,
      name: "email",
      messageError: "",
      isFormInvalid: false,
    },
    password: {
      value: "",
      hasError: false,
      name: "password",
      messageError: "",
      isFormInvalid: false,
    },
    name: {
      value: "",
      hasError: false,
      name: "name",
      messageError: "",
      isFormInvalid: false,
    },
    lastName: {
      value: "",
      hasError: false,
      name: "lastName",
      messageError: "",
      isFormInvalid: false,
    },
    phone: {
      value: "",
      hasError: false,
      name: "phone",
      messageError: "",
      isFormInvalid: false,
    },
    address: {
      value: "",
      hasError: false,
      name: "address",
      messageError: "",
      isFormInvalid: false,
    },
  };

  const { state, onChange, isValidaFormState } = useForm(initialState);

  const changeValue = ({ value, name }: RegisterOnChangeProps): void => {
    onChange({ value, name });
  };

  /**
   * This function handles changes in the bottom sheet state and updates the header visibility accordingly.
   *
   * @param {number} stateShowVisibleBottomSheet
   * - The stateShowVisibleBottomSheet representing the bottom sheet state.
   * - 1 or 2: Bottom sheet is open.
   * - 0: Bottom sheet is closed.
   */
  const onChangeVisibleBottomSheet = async (
    stateShowVisibleBottomSheet: number,
  ) => {
    if (stateShowVisibleBottomSheet === 2) {
      dispatch(setHeaderShow({ show: false }));
      return;
    }
    if (
      stateShowVisibleBottomSheet === -1 ||
      stateShowVisibleBottomSheet === 0
    ) {
      await dispatch(setCleanCurrentHotel());
    }
  };

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        index={0}
        backgroundStyle={{ backgroundColor: "gray" }}
        onChange={onChangeVisibleBottomSheet}
      >
        <BottomSheetView style={styles.contentContainerBottomSheet}>
          <View style={styles.continerImageHotel}>
            <Text style={{ color: "#fff" }}>Imagen de hotel</Text>
          </View>
          <View style={styles.flexBottomSheet}>
            <Text style={styles.containerDetailsHotel}>Detalles del hotel</Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};
