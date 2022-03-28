import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import PortfolioAssetsList from "./PortfolioAssetsList";

const PorfolioScreen = () => {
  return (
    <View>
      <PortfolioAssetsList />
    </View>
  );
};

export default PorfolioScreen;

const styles = StyleSheet.create({});
