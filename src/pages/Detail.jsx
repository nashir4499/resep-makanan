import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const Detail = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const respone = await fetch(
        `https://masak-apa-tomorisakura.vercel.app/api/recipe/${route.params.key}`
      );
      const json = await respone.json();
      // console.log(json.results);
      setData(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          data && data.thumb != null
            ? { uri: data.thumb }
            : require("../../assets/bg1.png")
        }
      />
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          padding: 10,
          justifyContent: "space-between",
          // backgroundColor: "blue",
          height: 45,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
        <Ionicons name="heart" size={24} color="white" />
      </View>
      <View style={{ height: 95 }}>
        <Text style={styles.title}>{data && data.title}</Text>
      </View>

      <View
        style={{
          height: 115,
          padding: 5,
          paddingHorizontal: 10,
          alignSelf: "flex-start",
          // backgroundColor: "rgba(57, 62, 70,0.4)",
        }}
      >
        <Text style={styles.subTitle}>
          Kesulitan : {data && data.dificulty}
        </Text>
        <Text style={styles.subTitle}>Porsi : {data && data.servings}</Text>
        <Text style={styles.subTitle}>Waktu : {data && data.times}</Text>
        <View>
          <Text style={styles.subTitle}>Penulis</Text>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.subTitle}>
              Nama : {data && data.author.user}
            </Text>
            <Text style={styles.subTitle}>
              Diterbitkan : {data && data.author.datePublished}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          // backgroundColor: "rgba(57, 62, 70,0.4)",
        }}
      >
        <View
          style={{
            backgroundColor: "#222831",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            minWidth: "100%",
            minHeight: "100%",
          }}
        >
          <View style={styles.card}>
            <Text style={styles.subTitle}>Deskripsi:</Text>
            <Text style={styles.text}>{data && data.desc}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.subTitle}>Barang:</Text>
            {data &&
              data.needItem.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginHorizontal: 10,
                  }}
                >
                  <Text style={styles.text}>{item.item_name}</Text>
                  <Image
                    style={styles.imageItem}
                    source={{ uri: item.thumb_item }}
                  />
                </View>
              ))}
          </View>
          <View style={styles.card}>
            <Text style={styles.subTitle}>Bahan:</Text>
            {data &&
              data.ingredient.map((ingre, index) => (
                <View key={index}>
                  <Text style={styles.text}>{ingre}</Text>
                </View>
              ))}
          </View>
          <View style={styles.card}>
            <Text style={styles.subTitle}>Langkah:</Text>
            {data &&
              data.step.map((step, index) => (
                <View key={index}>
                  <Text style={styles.text}>{step}</Text>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    // backgroundColor: "#222831",
    alignItems: "center",
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: "#393E46",
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    // paddingBottom: 20,
    // paddingHorizontal: 15,
    // marginHorizontal: 15,
    textShadowColor: "#393E46",
    textShadowRadius: 3,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
  },
  subTitle: {
    color: "white",
    fontWeight: "bold",
    textShadowColor: "#393E46",
    textShadowRadius: 3,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
  text: {
    color: "white",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: 300,
    right: 0,
    top: 0,
  },
  imageItem: {
    width: 50,
    height: 50,
    resizeMode: "center",
    // borderRadius: 10,
    // borderTopLeftRadius: 10,
    // borderBottomLeftRadius: 10,
  },
});
