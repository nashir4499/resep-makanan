import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CardItem from "./components/CardItem";

const Layout = () => {
  return (
    <View style={styles.container}>
      <CardItem />
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#570530",
  },
});
