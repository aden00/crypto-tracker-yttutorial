import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import crypto from "../../../assets/Crypto Tracker Assets/data/crypto.json";
import { useNavigation } from "@react-navigation/native";
import { useWatchList } from "../../Contexts/WatchlistContext";
const CoinDetailsHeader = ({ image, symbol, market_cap_rank, coinId }) => {
  const navigation = useNavigation();
  const { watchListCoinsIds, storeWatchListCoinId, removeWatchListCoinId } =
    useWatchList();
  const checkIfCoinIsWatchListed = () => {
    return watchListCoinsIds.some((coinIdval) => coinIdval === coinId);
  };
  const handleWatchListCoin = () => {
    if (checkIfCoinIsWatchListed()) {
      //remove from watch list
      removeWatchListCoinId(coinId);
      alert("removed from Watch List");
    } else {
      //add item to list
      storeWatchListCoinId(coinId);
      alert("added to Watch List");
    }
  };
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.3}>
        <Ionicons
          name="arrow-back-sharp"
          size={30}
          color="white"
          style={{ alignSelf: "center" }}
        />
      </TouchableOpacity>
      <View style={styles.symbolContainer}>
        <Image source={{ uri: image }} style={{ width: 35, height: 35 }} />
        <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
        <View style={styles.rankContainer}>
          <Text style={styles.rank}>#{market_cap_rank}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{ alignSelf: "center" }}
        onPress={handleWatchListCoin}
      >
        <AntDesign
          name={checkIfCoinIsWatchListed() ? "eye" : "eyeo"}
          size={30}
          color={checkIfCoinIsWatchListed() ? "grey" : "white"}
          style={{ alignSelf: "center" }}
        />
        {/* <AntDesign
          name="eyeo"
          size={30}
          color="white"
          style={{ alignSelf: "center" }}
        /> */}
      </TouchableOpacity>
    </View>
  );
};

export default CoinDetailsHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#282828",
    paddingBottom: 10,
  },
  symbolContainer: {
    flexDirection: "row",
  },
  symbol: {
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
    margin: 5,
    marginRight: 8,
    fontSize: 17,
  },
  rank: {
    color: "lightgrey",
    fontWeight: "bold",
    alignSelf: "center",
  },
  rankContainer: {
    backgroundColor: "#585858",
    borderRadius: 5,
    paddingHorizontal: 5,
    alignContent: "center",
    justifyContent: "center",
    height: 30,
    alignSelf: "center",
  },
});
