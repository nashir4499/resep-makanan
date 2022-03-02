import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import CardItem from "../components/CardItem";
import CardItemLarge from "../components/CardItemLarge";
import Category from "../components/Category";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingDataKat, setLoadingDataKat] = useState(false);
  const [datas, setDatas] = useState([]);
  const [categorySet, setCategorySet] = useState("");
  const [page, setPage] = useState(1);
  const [categorys, setCategorys] = useState([]);
  const [datasCategory, setDatasCategory] = useState([]);

  const getData = async (value) => {
    setLoadingData(true);
    try {
      const respone = await fetch(
        `https://masak-apa-tomorisakura.vercel.app/api/recipes/${value}`
      );
      const json = await respone.json();
      // console.log(json.results);
      setDatas(json.results);
      setPage(value);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingData(false);
      // setLoading(false);
    }
  };

  const getCategory = async () => {
    try {
      const respone = await fetch(
        "https://masak-apa-tomorisakura.vercel.app/api/categorys/recipes"
      );
      const json = await respone.json();
      setCategorys(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  const getDataCategory = async (category) => {
    setLoadingDataKat(true);
    setCategorySet(category);
    try {
      const respone = await fetch(
        `https://masak-apa-tomorisakura.vercel.app/api/categorys/recipes/${category}`
      );
      const json = await respone.json();
      // console.log(json.results);
      setDatasCategory(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDataKat(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(page);
    getCategory();
    getDataCategory("resep-dessert");
    // setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View
            style={{
              backgroundColor: "#393E46",
              borderRadius: 500,
              padding: 15,
              marginBottom: 100,
              elevation: 5,
            }}
          >
            <Image
              style={{
                height: 150,
                width: 150,
                resizeMode: "center",
              }}
              source={require("../../assets/Logo.png")}
            />
          </View>
          <ActivityIndicator size="large" color="#eeee" />
        </View>
      ) : (
        <>
          <Image
            style={{
              position: "absolute",
              height: 350,
              width: 350,
              top: -100,
              right: -100,
            }}
            source={require("../../assets/bg1.png")}
          />
          <View
            style={{
              flex: 0.07,
              backgroundColor: "black",
              alignSelf: "flex-start",
              alignItems: "flex-start",
              paddingHorizontal: 20,
              borderRadius: 20,
            }}
          >
            <Text style={styles.title}>MasakYuK</Text>
            <Text style={styles.text}>Mari Kita Memasak</Text>
          </View>
          <View style={{ flex: 0.09, minWidth: "100%" }}>
            <Text style={styles.subTitle}>
              <MaterialIcons name="category" size={20} color="white" /> Kategori
            </Text>
            <ScrollView style={styles.scrollerHorion} horizontal>
              {categorys.length > 0 &&
                categorys.map((category) => (
                  <TouchableOpacity
                    key={category.key}
                    onPress={() => getDataCategory(category.key)}
                  >
                    <Category
                      name={category.category}
                      active={category.key == categorySet ? true : false}
                    />
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
          <View style={{ flex: 0.34, width: "100%" }}>
            <ScrollView style={styles.scrollerHorion} horizontal>
              {loadingDataKat ? (
                <View
                  style={{
                    justifyContent: "center",
                    marginLeft: 20,
                  }}
                >
                  <ActivityIndicator
                    // style={{ marginTop: 100 }}
                    size="large"
                    color="#eeee"
                  />
                </View>
              ) : (
                datasCategory.length > 0 &&
                datasCategory.map((data) => (
                  <TouchableOpacity
                    key={data.key}
                    onPress={() =>
                      navigation.navigate("Detail", { key: data.key })
                    }
                  >
                    <CardItem
                      key={data.key}
                      dificulty={data.dificulty}
                      portion={data.portion}
                      thumb={data.thumb}
                      times={data.times}
                      title={data.title}
                    />
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
          <View style={{ flex: 0.5, minWidth: "100%" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.subTitle}>
                <FontAwesome5 name="cookie-bite" size={20} color="white" />{" "}
                Masakan
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: 60,
                  justifyContent: "space-between",
                  marginRight: 10,
                }}
              >
                <TouchableOpacity
                  onPress={page > 1 ? () => getData(page - 1) : () => false}
                >
                  <AntDesign name="leftcircleo" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => getData(page + 1)}>
                  <AntDesign name="rightcircleo" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView style={styles.scrollerHorion}>
              {loadingData ? (
                <ActivityIndicator
                  style={{ marginTop: 100 }}
                  size="large"
                  color="#eeee"
                />
              ) : (
                datas.length > 0 &&
                datas.map((data) => (
                  <TouchableOpacity
                    key={data.key}
                    onPress={() =>
                      navigation.navigate("Detail", { key: data.key })
                    }
                    // onPress={() => getDataCategory(data.key)}
                  >
                    <CardItemLarge
                      key={data.key}
                      dificulty={data.dificulty}
                      portion={data.portion}
                      thumb={data.thumb}
                      times={data.times}
                      title={data.title}
                    />
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={styles.search}
            onPress={() => navigation.navigate("Search")}
          >
            <FontAwesome name="search" size={32} color="white" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    backgroundColor: "#222831",
    padding: 5,
    alignItems: "center",
  },
  title: {
    // marginLeft: 10,
    color: "#fff",
    alignSelf: "flex-start",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    // marginLeft: 10,
    color: "#fff",
    alignSelf: "flex-start",
    fontSize: 10,
  },
  subTitle: {
    marginLeft: 10,
    marginVertical: 5,
    color: "#fff",
    alignSelf: "flex-start",
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollerHorion: {
    // backgroundColor: "black",
    // flex: 1,
    // marginHorizontal: 20,
  },
  search: {
    position: "absolute",
    backgroundColor: "#00ADB5",
    padding: 14,
    bottom: 14,
    right: 14,
    borderRadius: 9999,
    elevation: 5,
  },
});
