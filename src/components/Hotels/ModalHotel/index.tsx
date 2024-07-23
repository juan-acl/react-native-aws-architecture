import { useCallback } from "react";
import { Button, Modal, Stack, FormControl } from "native-base";
import { useAppDispatch, useAppSelector } from "@/src/redux/configureStore";
import { setShowModalHotel } from "@/src/redux/slices/hotel.slice";
import { useFocusEffect } from "@react-navigation/native";
import { Input } from "@/src/components/Input";
import { FormState, useForm } from "@/src/hooks/useForm";
import { CreateHotelPropsChange } from "@/src/types/hotel";
import { styles } from "./modal.styles";

export const ModalHotel = () => {
  const initialState: FormState = {
    email: {
      value: "",
      hasError: false,
      name: "email",
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
    image: {
      value: "",
      hasError: false,
      name: "image",
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

  const { state, onChange, clearState } = useForm(initialState);
  const showModal = useAppSelector(
    (state) => state.reducer.hotels.showModalHotel
  );
  const dispatch = useAppDispatch();

  const onCloseModal = () => {
    dispatch(setShowModalHotel({ showModalHotel: false }));
    clearState(Object.keys(initialState));
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (!showModal) return;
        dispatch(setShowModalHotel({ showModalHotel: false }));
      };
    }, [dispatch, showModal])
  );

  const changeValue = ({ value, name }: CreateHotelPropsChange) => {
    onChange({ value, name });
  };

  return (
    <>
      <Stack
        direction={{
          base: "column",
          md: "row",
        }}
        space={2}
      ></Stack>
      <Modal isOpen={showModal} onClose={onCloseModal} safeAreaTop={true}>
        <Modal.Content maxWidth="350" style={styles.modalContent}>
          <Modal.CloseButton />
          <Modal.Header style={styles.modalHeader}>Crear Hotel</Modal.Header>
          <Modal.Body style={styles.modalBody}>
            <FormControl>
              <FormControl.Label>Nombre</FormControl.Label>
              <Input
                placeholder="Nombre"
                changeValue={changeValue}
                name={state.name.name}
                value={state.name.value}
                hasError={state.name.hasError}
                messageError={state.name.messageError}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Direccion</FormControl.Label>
              <Input
                changeValue={changeValue}
                placeholder="Direccion"
                value={state.address.value}
                name={state.address.name}
                hasError={state.address.hasError}
                messageError={state.address.messageError}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Telefono</FormControl.Label>
              <Input
                placeholder="Telefono"
                typeInput="numeric"
                maxLength={8}
                value={state.phone.value}
                changeValue={changeValue}
                name={state.phone.name}
                hasError={state.phone.hasError}
                messageError={state.phone.messageError}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Correo</FormControl.Label>
              <Input
                placeholder="Correo"
                value={state.email.value}
                changeValue={changeValue}
                name={state.email.name}
                hasError={state.email.hasError}
                messageError={state.email.messageError}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Cargar imagen</FormControl.Label>
              <Input
                placeholder="Cargar imagen"
                value={state.image.value}
                changeValue={changeValue}
                name={state.image.name}
                hasError={state.image.hasError}
                messageError={state.image.messageError}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer style={styles.modalFooter}>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={onCloseModal}
              >
                Cancel
              </Button>
              <Button style={styles.button} onPress={() => {}}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ModalHotel;
