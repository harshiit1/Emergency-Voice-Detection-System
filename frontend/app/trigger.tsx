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

      <Pressable style={styles.cancel} onPress={() => router.back()}>
        <Text style={styles.btnText}>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a0000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  alert: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  sub: {
    color: "#ffb3b3",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 40,
  },

  btn: {
    position: "absolute",
    bottom: 180,
    backgroundColor: Colors.red,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  cancel: { 
    position: "absolute",
    bottom: 100,
    backgroundColor: Colors.red,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
});
