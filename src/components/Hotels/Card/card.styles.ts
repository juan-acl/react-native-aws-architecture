import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
  },
  card: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    borderRadius: 10,
    objectFit: "cover",
    width: "100%",
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#543313",
    borderRadius: 20,
    padding: 5,
  },
  icon: {
    color: "#fff",
  },
  container_text: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 10,
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});

