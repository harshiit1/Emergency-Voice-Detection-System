import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../constants/colors";

export default function Trigger() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.alert}>🚨 Emergency Detected</Text>

      <Pressable style={styles.btn} onPress={() => router.push("/confirm")}>
        <Text style={styles.btnText}>Send Alert</Text>
      </Pressable>

      <Pressable onPress={() => router.back()}>
        <Text style={{ color: Colors.subText, marginTop: 10 }}>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a0000", justifyContent: "center", alignItems: "center" },
  alert: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  sub: { color: "#ccc", marginBottom: 20 },
  btn: { backgroundColor: Colors.red, padding: 14, borderRadius: 10 },
  btnText: { color: "#fff", fontWeight: "600" },
});
