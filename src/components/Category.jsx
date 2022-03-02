import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Category = (props) => {
  return (
    <View style={props.active ? styles.containerActive : styles.container}>
      <Text
        style={
          props.active
            ? { color: "#393E46", paddingHorizontal: 5 }
            : { color: "white", paddingHorizontal: 5 }
        }
      >
        {props.name}
      </Text>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#393E46",
    backgroundColor: "rgba(57, 62, 70,0.7)",
    padding: 5,
    margin: 5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  containerActive: {
    backgroundColor: "white",
    padding: 5,
    margin: 5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
