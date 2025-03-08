import { StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab 44</Text>
      <Link style={{ marginHorizontal: "auto" }} href="/picture" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Take Picture</Text>
        </Pressable>
      </Link>
      <View
        style={styles.separator}
        lightColor="rgba(255, 0, 0, 0.97)"
        darkColor="rgba(255, 0, 0, 0.97)"
      />
      {/* <EditScreenInfo path="app/(tabs)/two.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: "underline",
    padding: 4,
    color: "black",
  },
  button: {
    height: 60,
    borderRadius: 30,
    backgroundColor: "black",
    padding: 6,
    color: "black",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 4,
    color: "white",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
