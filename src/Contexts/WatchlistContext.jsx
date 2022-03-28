import React, { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const WatchListContext = createContext();

export const useWatchList = () => useContext(WatchListContext);
const WatchListProvider = ({ children }) => {
  const [watchListCoinsIds, setWatchListCoinsIds] = useState([]);
  const getWatchListData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@watchlist_coins");
      setWatchListCoinsIds(jsonValue !== null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.log(e);
    }
  };
  const storeWatchListCoinId = async (coinId) => {
    try {
      const newWatchList = [...watchListCoinsIds, coinId];
      const jsonValue = JSON.stringify(newWatchList);
      await AsyncStorage.setItem("@watchlist_coins", jsonValue);
      setWatchListCoinsIds(newWatchList);
    } catch (e) {
      console.log(e);
    }
  };
  const removeWatchListCoinId = async (coinId) => {
    try {
      const newWatchList = watchListCoinsIds.filter((id) => id !== coinId);
      const jsonValue = JSON.stringify(newWatchList);
      await AsyncStorage.setItem("@watchlist_coins", jsonValue);
      setWatchListCoinsIds(newWatchList);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getWatchListData();
  }, []);

  return (
    <WatchListContext.Provider
      value={{
        watchListCoinsIds,
        storeWatchListCoinId,
        removeWatchListCoinId,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
};
export default WatchListProvider;
