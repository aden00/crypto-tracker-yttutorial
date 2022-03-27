import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import CoinItem from "./src/components/CoinItem";
import HomeScreen from "./src/screens/HomeScreen";
import CoinDetailsScreen from "./src/screens/CoinDetailsScreen";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
export default function App() {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: "#121212",
        },
      }}
    >
      <View style={styles.container}>
        <Navigation />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 30,
  },
});
