import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
  backgroundImage: {
    width: "100%",
    height: "70%",
  },
  informationRoom: {
    flex: 1,
    gap: 10,
    flexDirection: "column",
  },
  headtText: {
    color: "grey",
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 2,
    fontSize: 17,
  },
  nameHotel: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
