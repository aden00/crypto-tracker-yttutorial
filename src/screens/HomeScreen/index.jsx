import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import cryptocurrencies from "../../../assets/Crypto Tracker Assets/data/cryptocurrencies.json";
import CoinItem from "../../components/CoinItem";
import { getMarketData } from "../../services/requests";
const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [coins, setCoins] = useState([]);
  const fetchCoinData = async (pageNum) => {
    if (loading) {
      return;
    }
    setLoading(true);

    // const existingCoinData = coins;
    const newCoinData = await getMarketData(pageNum);
    setCoins((existingCoinData) => [...existingCoinData, ...newCoinData]);
    setLoading(false);
  };
  const refreshCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinData = await getMarketData();
    setCoins(coinData);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoinData();
  }, []);

  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItem marketCoin={item} />}
      // keyExtractor={(item) => item.id}
      // onRefresh={fetchMarketDataAll}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor={"white"}
          onRefresh={refreshCoins}
        />
      }
      onEndReached={() => fetchCoinData(coins.length / 50 + 1)}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
