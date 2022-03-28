import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useWatchList } from "../../Contexts/WatchlistContext";
import CoinItem from "../../components/CoinItem";
import {
  getCoinDetailsData,
  getWatchListedCoins,
} from "../../services/requests";
const WatchListScreen = () => {
  const { removeWatchListCoinId, storeWatchListCoinId, watchListCoinsIds } =
    useWatchList();
  const [watchListCoinDetails, setWatchListCoinDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoinDetailsData = async () => {
    // watchListCoinsIds.forEach(async (coinid) => {
    //   console.log(coinid + "hi");
    //   const res = await getCoinDetailsData(coinid);
    //   console.log(res.id);
    //   setWatchListCoinDetails(async (existingData) => [existingData, res]);
    //   console.log(watchListCoinDetails);
    // });
    if (loading) {
      return;
    }
    setLoading(true);
    const string = watchListCoinsIds.join("%2C");
    console.log(string);
    const data = await getWatchListedCoins(1, string);
    setWatchListCoinDetails(data);
    console.log(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoinDetailsData();
  }, []);
  useEffect(() => {
    fetchCoinDetailsData();
  }, [watchListCoinsIds]);
  return (
    <View>
      <FlatList
        data={watchListCoinDetails}
        renderItem={({ item }) => <CoinItem marketCoin={item} watch={true} />}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={loading}
        //     tintColor={"white"}
        //     onRefresh={refreshCoins}
        //   />
        // }
        // onEndReached={() => fetchCoinData(coins.length / 50 + 1)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor={"white"}
            onRefresh={fetchCoinDetailsData}
          />
        }
      />
    </View>
  );
};

export default WatchListScreen;

const styles = StyleSheet.create({});
