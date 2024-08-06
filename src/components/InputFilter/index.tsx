import React from "react";
import {
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { setFilterText } from "@/src/redux/slices/hotel.slice";
import { AppDispatch } from "@/src/redux/configureStore";

export const InputFilter = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <TextInput
        placeholder="Buscar"
        onFocus={() => dispatch(setFilterText({ filterText: "" }))}
        onChangeText={(text) => dispatch(setFilterText({ filterText: text }))}
        style={styles.textInput}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#ccc",
    borderRadius: 20,
    width: 200,
    marginLeft: -5,
    height: "82%",
    textAlign: "center",
  },
});
