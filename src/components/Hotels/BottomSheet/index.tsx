import React, { useMemo, useCallback, useEffect } from "react";
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
   * @param {number} index
   * - The index representing the bottom sheet state.
   * - 1 or 2: Bottom sheet is open.
   * - 0: Bottom sheet is closed.
   */
  const onChangeVisibleBottomSheet = useCallback(
    async (stateShowVisibleBottomSheet: number) => {
      console.log(stateShowVisibleBottomSheet);
      if (
        stateShowVisibleBottomSheet === -1 ||
        stateShowVisibleBottomSheet === 0
      ) {
        await dispatch(setCleanCurrentHotel());
      }
      if (stateShowVisibleBottomSheet == 2) {
        dispatch(setHeaderShow({ show: false }));
        return;
      }
    },
    [],
  );

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        index={0}
        onChange={onChangeVisibleBottomSheet}
      >
        <BottomSheetView style={styles.contentContainerBottomSheet}>
          <Text style={{ ...styles.headtText, fontSize: 20 }}>
            Actualicemos tu perfil
          </Text>
          <View style={styles.flexBottomSheet}>
            <Pressable style={styles.RectangleShapeView}>
              <Input
                changeValue={changeValue}
                value={state.name.value}
                placeholder="Nombre completo"
                name={state.name.name}
                label="Nombre"
                hasError={state.name.hasError}
                messageError={state.name.messageError}
              />
            </Pressable>
            <Pressable style={styles.RectangleShapeView}>
              <Input
                changeValue={changeValue}
                value={state.lastName.value}
                placeholder="Apellido completo"
                name={state.lastName.name}
                label="Apellido"
                hasError={state.lastName.hasError}
                messageError={state.lastName.messageError}
              />
            </Pressable>
            <Pressable style={styles.RectangleShapeView}>
              <Input
                changeValue={changeValue}
                value={state.address.value}
                placeholder="Ciudad de Guatemala, zona 1, 1 calle 1-01"
                name={state.address.name}
                label="Direccion"
                hasError={state.address.hasError}
                messageError={state.address.messageError}
              />
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};
