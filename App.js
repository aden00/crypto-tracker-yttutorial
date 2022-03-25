import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import CoinItem from "./src/components/CoinItem";
import HomeScreen from "./src/screens/HomeScreen";
import CoinDetailsScreen from "./src/screens/CoinDetailsScreen";
export default function App() {
  return (
    <View style={styles.container}>
      {/* <HomeScreen />
       */}
      <CoinDetailsScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 30,
  },
});
