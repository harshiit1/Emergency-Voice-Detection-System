import { Stack } from "expo-router";
import { View } from "react-native";

export default function Layout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
