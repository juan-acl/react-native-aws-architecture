import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button_disabled: {
    padding: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#ccc",
  },
  modalContent: {
    borderRadius: 10,
    overflow: "hidden",
  },
  modalHeader: {
    backgroundColor: "#543313",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
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
  },
  sheetContainer: {
    marginHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#543313",
    borderRadius: 10,
    width: "40%",
  },
});
