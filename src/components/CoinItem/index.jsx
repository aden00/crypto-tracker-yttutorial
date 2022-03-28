import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { useNavigation } from "@react-navigation/native";
const CoinItem = ({ marketCoin, watch = false }) => {
  const navigation = useNavigation();

  const {
    name,
    id,
    image,
    current_price,
    symbol,
    market_cap_rank,
    price_change_percentage_24h,
    market_cap,
  } = marketCoin;
  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1_000_000_000_000) {
      return `${Math.floor(marketCap / 1_000_000_000_000)}T`;
    }
    if (marketCap > 1_000_000_000) {
      return `${Math.floor(marketCap / 1_000_000_000)}B`;
    }
    if (marketCap > 1_000_000) {
      return `${Math.floor(marketCap / 1_000_000)}M`;
    }
    return 10;
  };
  const percentageColor =
    price_change_percentage_24h > 0 ? "#16c784" : "#ea3943";
  return (
    <TouchableOpacity
      style={styles.coinContainer}
      onPress={() => navigation.navigate("CoinDetails", { coinId: id })}
      activeOpacity={0.5}
    >
      <View style={{ alignSelf: "center" }}>
        {!watch ? (
          <Image
            source={{
              uri: image,
            }}
            style={{
              width: 30,
              height: 30,
              marginRight: 10,
              alignSelf: "center",
            }}
          />
        ) : (
          <View>
            <Image
              source={{
                uri: image,
              }}
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
                alignSelf: "center",
              }}
            />
            <AntDesign
              name="eye"
              size={12}
              color="white"
              style={{ alignSelf: "center" }}
            />
          </View>
        )}
      </View>
      <View>
        <Text style={styles.title}>{name}</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.rankContainer}>
            <Text style={styles.rank}>{market_cap_rank}</Text>
          </View>
          <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
          <AntDesign
            name={price_change_percentage_24h > 0 ? "caretup" : "caretdown"}
            size={16}
            color={percentageColor}
            style={{
              alignSelf: "center",
              marginLeft: 2,
              marginRight: 3,
            }}
          />

          <Text style={{ padding: 2, color: percentageColor }}>
            {price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
        <Text style={styles.title}>{current_price.toFixed(2)}</Text>
        <Text style={styles.text}>MCap {normalizeMarketCap(market_cap)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CoinItem;

const styles = StyleSheet.create({
  coinContainer: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#282828",
    padding: 15,
  },
  subcontainer: {
    padding: 10,
    backgroundColor: "red",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 3,
    fontSize: 16,
  },
  rank: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
  rankContainer: {
    backgroundColor: "#3b3737",
    borderRadius: 5,
    paddingHorizontal: 5,
    marginRight: 5,
    alignContent: "center",
    justifyContent: "center",
  },
  shortcontainer: {
    flexDirection: "row",
  },
  text: {
    color: "white",
    padding: 2,
  },
  symbol: {
    color: "white",
    padding: 2,
    width: 50,
  },
});
