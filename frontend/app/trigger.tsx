import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Trigger() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>✓</Text>
      </View>

      <Text style={styles.title}>EMERGENCY ALERT SENT</Text>

      <View style={styles.infoBox}>
        <Text style={styles.sub}>
          Your GPS location and voice transcript have been dispatched to nearest
          responders.
        </Text>
      </View>

      <Text style={styles.helpText}>
        Help is on the way. Please stay where you are.
      </Text>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.homeButtonText}>RETURN TO HOME</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A", // Matching the dark theme
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#28A745",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#28A745",
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  icon: {
    fontSize: 50,
    color: "#FFF",
    fontWeight: "bold",
  },
  title: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 1.5,
    textAlign: "center",
  },
  infoBox: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 20,
    borderRadius: 12,
    marginVertical: 25,
    width: "100%",
  },
  sub: {
    color: "#AAAAAA",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },
  helpText: {
    color: "#28A745", // Green for safety
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 60,
  },
  homeButton: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    position: "absolute",
    bottom: 50,
  },
  homeButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
    letterSpacing: 1,
  },
});
