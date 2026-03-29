import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  getPendingRequests,
  updateEmergencyRequestStatus,
} from "@/services/apiService";
import { ITransponderAlert } from "@/models/transponder_interface";

export default function TransponderScreen() {
  const [alerts, setAlerts] = useState<ITransponderAlert[]>([]);

  const loadData = async () => {
    const data = await getPendingRequests();
    setAlerts(data);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAccept = async (id: number) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.ResponseId === id ? { ...alert, Status: "ACCEPTED" } : alert,
      ),
    );
    const success = await updateEmergencyRequestStatus(id);

    if (success) {
      loadData();
    } else {
      alert("Network error: Could not accept call.");
      loadData();
    }
  };

  const openMap = (MapsURL: any) => {
    if (MapsURL) {
      Linking.openURL(MapsURL).catch((err) =>
        console.error("Couldn't load page", err),
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>🚑 Active Dispatch</Text>
        <View style={styles.liveIndicator}>
          <View style={styles.dot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      <FlatList
        data={alerts}
        keyExtractor={(item, index) => {
          return item?.ResponseId?.toString() || index.toString();
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No pending emergencies.</Text>
            <Text style={styles.emptySubText}>All clear for now!</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.caseId}>CASE #{item.ResponseId}</Text>
              <Text style={styles.time}>
                {new Date(item.CreatedOn).toLocaleTimeString()}
              </Text>
            </View>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{item.Status}</Text>
            </View>

            <TouchableOpacity
              style={styles.mapButton}
              onPress={() => openMap(item.MapsURL)}
            >
              <Text style={styles.mapButtonText}>
                📍 View Destination on Map
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                item.Status !== "PENDING" && styles.disabledButton,
              ]}
              onPress={() => {
                handleAccept(item.ResponseId);
              }}
              disabled={item.Status !== "PENDING"}
            >
              <Text style={styles.actionButtonText}>
                {item.Status === "PENDING"
                  ? "ACCEPT EMERGENCY CALL"
                  : "EN ROUTE"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F2F4F7" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, color: "#666", fontWeight: "500" },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  headerTitle: { fontSize: 26, fontWeight: "800", color: "#1A1C1E" },

  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFEBEB",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D9534F",
    marginRight: 6,
  },
  liveText: { color: "#D9534F", fontWeight: "bold", fontSize: 12 },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#D9534F", // Red bar to indicate emergency
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  caseId: { fontSize: 14, fontWeight: "700", color: "#666" },
  time: { fontSize: 14, color: "#999" },

  statusBadge: {
    backgroundColor: "#FFF9E6",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 15,
  },
  statusText: { color: "#F0AD4E", fontWeight: "700", fontSize: 12 },

  mapButton: {
    backgroundColor: "#F0F7FF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#CCE5FF",
  },
  mapButtonText: { color: "#007AFF", fontWeight: "700" },

  actionButton: {
    backgroundColor: "#28A745",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  actionButtonText: { color: "#FFF", fontWeight: "800", fontSize: 14 },
  disabledButton: { backgroundColor: "#A5D6A7" },

  emptyContainer: { marginTop: 100, alignItems: "center" },
  emptyText: { fontSize: 18, fontWeight: "bold", color: "#CCC" },
  emptySubText: { color: "#DDD", marginTop: 5 },
});
