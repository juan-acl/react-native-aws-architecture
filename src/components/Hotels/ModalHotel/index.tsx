import { Button, Modal, Stack, FormControl, Input } from "native-base";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/src/redux/configureStore";
import { setShowModalHotel } from "@/src/redux/slices/hotel.slice";

export const ModalHotel = () => {
  const showModal = useAppSelector(
    (state) => state.reducer.hotels.showModalHotel
  );
  const dispatch = useAppDispatch();

  const onCloseModal = () => {
    dispatch(setShowModalHotel({ showModalHotel: false }));
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
              <Button onPress={() => {}}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    borderRadius: 10,
    overflow: "hidden",
  },
  modalHeader: {
    backgroundColor: "#4a90e2",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalBody: {
    backgroundColor: "#f0f0f0",
    paddingTop: 10,
    paddingBottom: 10,
  },
  modalFooter: {
    backgroundColor: "#f0f0f0",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  sheetContainer: {
    marginHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default ModalHotel;
