import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import CardItemLarge from "../components/CardItemLarge";

const Search = ({ navigation }) => {
  const [datas, setDatas] = useState([]);
  const [text, setText] = useState();
  const [loading, setLoading] = useState();

  const searchItem = async () => {
    if (text.length > 0) {
      setLoading(true);
      try {
        const respone = await fetch(
          `https://masak-apa-tomorisakura.vercel.app/api/search/?q=${text}`
        );
        const json = await respone.json();
        setDatas(json.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formInput}>
        <FontAwesome
          name="search"
          style={{ marginLeft: 5 }}
          size={24}
          color="#222831"
        />
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          onSubmitEditing={() => searchItem()}
          autoFocus
        />
      </View>
      <View>
        <ScrollView style={{ marginTop: 20 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#eeee" />
          ) : (
            datas.length > 0 &&
            datas.map((data) => (
              <TouchableOpacity
                key={data.key}
                onPress={() => navigation.navigate("Detail", { key: data.key })}
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
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    backgroundColor: "#222831",
    padding: 5,
    alignItems: "center",
  },
  formInput: {
    marginTop: 10,
    flexDirection: "row",
    borderRadius: 50,
    backgroundColor: "#EEEEEE",
    padding: 5,
  },
  input: {
    // padding: 5,
    // paddingHorizontal: 10,
    marginLeft: 10,
    width: "80%",
    // backgroundColor: "black",
  },
});
