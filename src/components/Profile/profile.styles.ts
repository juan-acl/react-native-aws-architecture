import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  flexBottomSheet: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    flex: 1,
    marginTop: 63,
  },
  groupButtons: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  contentContainerBottomSheet: {
    flex: 1,
    alignItems: "center",
  },
  avatar: {
    width: 112,
    height: 110,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: "white",
  },
  name: {
    fontSize: 22,
    color: "black",
    fontWeight: "600",
  },
  headtText: {
    color: "grey",
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 10,
    fontSize: 17,
  },
  SubjectText: {
    color: "black",
    fontSize: 20,
    marginLeft: 17,
    marginTop: 10,
  },
  userInfo: {
    fontSize: 20,
    color: "white",
    fontWeight: "600",
  },
  btn: {
    marginTop: 20,
    backgroundColor: "#3B525F",
    borderRadius: 10,
    width: "40%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    elevation: 30,
  },
  body: {
    backgroundColor: "white",
    alignItems: "center",
    height: 500,
  },
  text: {
    color: "white",
    margin: 5,
    padding: 5,
  },
  RectangleShapeView: {
    marginTop: 20,
    width: "100%",
    height: "20%",
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    elevation: 3,
  },
  Flex: {
    flex: 1,
    flexDirection: "row",
  },
});
