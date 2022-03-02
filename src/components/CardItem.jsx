import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const CardItem = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.7, paddingTop: 4 }}>
        <Image style={styles.image} source={{ uri: props.thumb }} />
      </View>
      <View
        style={{
          flex: 0.3,
          justifyContent: "space-between",
          paddingBottom: 4,
        }}
      >
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.dificulty}</Text>
        {/* <Text style={styles.text}>{props.portion}</Text>
        <Text style={styles.text}>Dalam {props.times}</Text> */}
      </View>
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#393E46",
    // backgroundColor: "rgba(57, 62, 70,0.7)",
    width: 170,
    height: "95%",
    padding: 5,
    margin: 5,
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
});
