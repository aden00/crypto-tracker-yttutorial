import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
const PortfolioAssetsList = () => {
  return (
    <View>
      <FlatList
        data={[]}
        renderItem={() => <Text>Items</Text>}
        ListHeaderComponent={
          <>
            <View style={styles.container}>
              <View style={styles.balanceContainer}>
                <Text style={styles.currentBalance}>Current Balance</Text>
                <Text style={styles.currentBalanceVal}>$20,000</Text>
                <Text style={styles.valChange}>1000 (all time)</Text>
              </View>
              <View style={styles.perContainer}>
                <AntDesign
                  name={"caretup"}
                  size={13}
                  color={"white"}
                  style={{ marginRight: 3, alignSelf: "center" }}
                />
                <Text style={styles.currentBalance}>1.2%</Text>
              </View>
            </View>
          </>
        }
      />
    </View>
  );
};

export default PortfolioAssetsList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceContainer: {
    margin: 10,
  },
  currentBalance: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  currentBalanceVal: {
    fontSize: 40,
    fontWeight: "700",
    color: "white",
    letterSpacing: 1,
  },
  valChange: {
    fontWeight: "600",
    color: "green",
    fontSize: 16,
  },
  perChange: {
    color: "white",
    fontSize: 17,
  },
  perContainer: {
    flexDirection: "row",
    backgroundColor: "green",
    alignItems: "center",
    margin: 10,
    padding: 5,
    borderRadius: 5,
    height: "40%",
    alignSelf: "center",
  },
});
