import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

export default function Confirm() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>✅</Text>
      <Text style={styles.title}>Help is on the way</Text>
      <Text style={styles.sub}>Responders notified</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg, justifyContent: "center", alignItems: "center" },
  icon: { fontSize: 50 },
  title: { color: Colors.text, fontSize: 20 },
  sub: { color: Colors.subText },
});
