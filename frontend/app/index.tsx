import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Line, Path, Rect } from "react-native-svg";
import { Colors } from "../constants/colors";
import { useEmergencyListener } from "./listener";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const { startContinuousListening, stopContinuousListening } =
    useEmergencyListener((text) => {
      router.push("/trigger");   
    });

  useEffect(() => {
    startContinuousListening();
    return () => stopContinuousListening();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ALERTI-FY</Text>
        <Text style={styles.sub}>
          SMART EMERGENCY VOICE DETECTION & RESPONSE SYSTEM
        </Text>
      </View>

      <View style={styles.micRing}>
        <Svg style={styles.micIcon} viewBox="0 0 24 24">
          <Rect x="9" y="2" width="6" height="11" rx="3" fill="#E24B4A" />

          <Path
            d="M5 10v2a7 7 0 0014 0v-2"
            stroke="#E24B4A"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <Line
            x1="12"
            y1="19"
            x2="12"
            y2="22"
            stroke="#E24B4A"
            strokeWidth="2"
          />

          <Line
            x1="8"
            y1="22"
            x2="16"
            y2="22"
            stroke="#E24B4A"
            strokeWidth="2"
          />
        </Svg>
      </View>

      <Text style={styles.listen}>Listening...</Text>

      <Pressable style={styles.button} onPress={() => router.push("/trigger")}>
        <Text style={styles.btnText}>Simulate Emergency</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 100,
    alignItems: "center",
  },
  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  sub: {
    color: Colors.subText,
    marginTop: 6,
    textAlign: "center",
    paddingHorizontal: 30,
    fontSize: 11,
    lineHeight: 16,
  },
  mic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  listen: {
    color: Colors.green,
    marginTop: 15,
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    backgroundColor: Colors.red,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    position:'relative',
    top: 120
  },
  btnText: { color: "#fff", fontWeight: "600" },
  micRing: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(226,75,74,0.1)",
  },
  micIcon: {
    width: 60,
    height: 60,
  },
});
