import { Button, Modal, Stack, FormControl, Input } from "native-base";
import { useAppDispatch, useAppSelector } from "@/src/redux/configureStore";
import { setShowModalHotel } from "@/src/redux/slices/hotel.slice";
import { styles } from "./modal.styles";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export const ModalHotel = () => {
  const showModal = useAppSelector(
    (state) => state.reducer.hotels.showModalHotel
  );
  const dispatch = useAppDispatch();

  const onCloseModal = () => {
    dispatch(setShowModalHotel({ showModalHotel: false }));
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (!showModal) return;
        dispatch(setShowModalHotel({ showModalHotel: false }));
      };
    }, [dispatch, showModal])
  );

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
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Direccion</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Telefono</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Correo</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Cargar imagen</FormControl.Label>
              <Input />
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
