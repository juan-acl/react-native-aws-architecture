import React, { useCallback, useMemo } from "react";
import { Text, View, Pressable, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Input } from "@/src/components/Input";
import { FormState, useForm } from "@/src/hooks/useForm";
import { styles } from "./profile.styles";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/configureStore";
import { useFocusEffect } from "@react-navigation/native";

interface Props {
  bottomSheetRef: React.RefObject<BottomSheet>;
  onChangeBottomSheet: (value: number) => void;
}

interface RegisterOnChangeProps {
  value: string;
  name: string;
}

export const ActionSheetUpdateProfile: React.FC<Props> = ({
  bottomSheetRef,
  onChangeBottomSheet,
}: Props) => {
  const userInformation = useSelector(
    (state: RootState) => state.reducer.auth.userInformation,
  );
  const snapPoints = useMemo(() => [0.1, "50%", "100%"], []);
  const initialState: FormState = {
    password: {
      value: "",
      hasError: false,
      name: "password",
      messageError: "",
      isFormInvalid: false,
    },
    name: {
      value: userInformation?.name || "",
      hasError: false,
      name: "name",
      messageError: "",
      isFormInvalid: false,
    },
    lastName: {
      value: userInformation?.family_name || "",
      hasError: false,
      name: "lastName",
      messageError: "",
      isFormInvalid: false,
    },
    address: {
      value: userInformation?.address || "",
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

  const confirmUpdateProfile = (): void => {
    let log = "Presionado la confirmacion";
    console.log(log);
  };

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={onChangeBottomSheet}
        index={0}
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
            <View style={styles.groupButtons}>
              <TouchableOpacity
                style={styles.btn}
                onPress={confirmUpdateProfile}
              >
                <Text style={styles.text}>Actualizar perfil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};
