import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const CardItemLarge = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.4 }}>
        <Image style={styles.image} source={{ uri: props.thumb }} />
      </View>
      <View
        style={{
          flex: 0.6,
          height: "90%",
          padding: 5,
          justifyContent: "space-evenly",
          // backgroundColor: "black",
        }}
      >
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>Kesulitan : {props.dificulty}</Text>
        <Text style={styles.text}>Porsi : {props.portion}</Text>
        <Text style={styles.text}>
          <Entypo name="time-slot" size={14} color="white" /> {props.times}
        </Text>
      </View>
    </View>
  );
};

export default CardItemLarge;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#393E46",
    // padding: 5,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 5,
    width: "100%",
    height: 150,
  },
  image: {
    width: 150,
    height: 150,
    // borderRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
});
