import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  button_disabled: {
    marginTop: 20,
    padding: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#ccc",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 24,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#543313",
    borderRadius: 15,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
