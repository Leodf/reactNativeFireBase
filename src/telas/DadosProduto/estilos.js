import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 25,
  },
  texto: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 20,
  },
  viewBotao: {
    height: 50,
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  update: {
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 10,
    flexBasis: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
  delete: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
    flexBasis: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
});
