
import { Platform, StyleSheet, ScrollView, View, useWindowDimensions } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";


const {height, width } = useWindowDimensions();

export default function HomeScreen() {

  return (
    <ScrollView style = {styles.container}>

      <View style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Notes</ThemedText>
        <HelloWave />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    margin: 'auto',
    marginTop: height * 0.1, // Dimensions API to get screen height
  },

  titleContainer: {
    flexDirection: "row",
    // alignItems: "center",
    gap: 20,
  },
  noteContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
