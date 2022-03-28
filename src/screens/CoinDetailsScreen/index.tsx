import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import crypto from "../../../assets/Crypto Tracker Assets/data/crypto.json";
import CoinDetailsHeader from "../../components/CoinDetailsHeader";
import { AntDesign } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  monotoneCubicInterpolation,
  ChartYLabel,
} from "@rainbow-me/animated-charts";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getCoinDetailsData,
  getCoinMarketChart,
} from "../../services/requests";

const CoinDetailsScreen = () => {
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const coinId = route.params.coinId;
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState("");

  console.log(coinId);

  console.log(route);
  const fetchCoinData = async () => {
    setLoading(true);
    const fetchedCoinData = await getCoinDetailsData(coinId);
    const fetchedCoinMarketData = await getCoinMarketChart(coinId);
    setCoin(fetchedCoinData);
    setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());

    setCoinMarketData(fetchedCoinMarketData);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoinData();
  }, []);

  if (loading || !coin || !coinMarketData) {
    return (
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  const {
    image: { thumb, small, large },
    id,
    symbol,
    market_data: {
      price_change_percentage_24h,
      market_cap_rank,
      current_price,
    },
    name,
  } = coin;
  const { prices } = coinMarketData;
  // setUsdValue(current_price.usd.toString());
  const percentageColor =
    price_change_percentage_24h > 0 ? "#16c784" : "#ea3943";
  const chartColor = current_price.usd > prices[0][1] ? "#16c784" : "#ea3943";
  const screenWidth = Dimensions.get("screen").width;
  const resetConverter = () => {
    setCoinValue("1");
    setUsdValue(current_price.usd.toString());
  };
  const changeCoinValue = (val) => {
    setCoinValue(val);

    const floatValue = parseFloat(val) || 0;
    setUsdValue((floatValue * current_price.usd).toString());
  };
  const changeUsdValue = (val) => {
    setUsdValue(val);
    const floatValue = parseFloat(val) || 0;
    setCoinValue((floatValue / current_price.usd).toString());
  };
  const formatCurrency = (value) => {
    "worklet";
    if (value === "") {
      return `$${current_price.usd.toFixed(2)}`;
    }
    return `$${parseFloat(value).toFixed(2)}`;
  };
  return (
    <View style={{ paddingHorizontal: 10, paddingTop: 30 }}>
      <ChartPathProvider
        data={{
          points: prices.map(([x, y]) => ({ x, y })),
          //   points: prices.map((price) => ({ x: price[0], y: price[1] })),
          smoothingStrategy: "simple",
        }}
      >
        <CoinDetailsHeader
          coinId={id}
          image={small}
          symbol={symbol}
          market_cap_rank={market_cap_rank}
        />
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <ChartYLabel format={formatCurrency} style={styles.currentPrice} />
            {/* <Text style={styles.currentPrice}>{current_price.usd} US$</Text> */}
          </View>
          <View
            style={{
              backgroundColor: percentageColor,
              height: "50%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              padding: 5,
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            <AntDesign
              name={price_change_percentage_24h > 0 ? "caretup" : "caretdown"}
              size={13}
              color={"white"}
              style={{ marginRight: 3, alignSelf: "center" }}
            />
            <Text style={styles.priceChange}>
              {price_change_percentage_24h.toFixed(2)}%
            </Text>
          </View>
        </View>
        <View>
          <ChartPath
            height={screenWidth / 2}
            stroke={chartColor}
            width={screenWidth - 20}
            // style={{ margin: 10 }}
          />
          <ChartDot
            style={{
              backgroundColor: chartColor,
            }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>
              {symbol.toUpperCase()}
            </Text>

            <TextInput
              style={styles.input}
              value={coinValue.toString()}
              keyboardType="numeric"
              onChangeText={changeCoinValue}
            />
          </View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>USD</Text>

            <TextInput
              style={styles.input}
              value={usdValue.toString()}
              onChangeText={changeUsdValue}
              keyboardType="numeric"
            />
          </View>
        </View>
        <TouchableOpacity onPress={resetConverter}>
          <View
            style={{
              backgroundColor: percentageColor,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "black", fontSize: 16 }}>
              reset
            </Text>
          </View>
        </TouchableOpacity>
      </ChartPathProvider>
    </View>
  );
};

export default CoinDetailsScreen;
const styles = StyleSheet.create({
  priceContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  currentPrice: {
    color: "white",
    fontSize: 30,
    fontWeight: "600",
    letterSpacing: 1,
  },
  name: { color: "white", fontSize: 16 },
  priceChange: { color: "white", fontSize: 17, fontWeight: "600" },
  input: {
    flex: 1,
    height: 40,

    margin: 5,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    fontSize: 16,
    padding: 10,
    color: "white",
  },
});
