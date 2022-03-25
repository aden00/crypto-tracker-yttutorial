import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import cryptocurrencies from "../../../assets/Crypto Tracker Assets/data/cryptocurrencies.json";
import CoinItem from "../../components/CoinItem";
const HomeScreen = () => {
  return (
    <FlatList
      data={cryptocurrencies}
      renderItem={({ item }) => <CoinItem marketCoin={item} />}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
