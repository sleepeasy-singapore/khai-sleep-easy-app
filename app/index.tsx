import { router } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Root router entry: checks session storage and routes immediately to Welcome or Home.
 */
export default function Index() {
  useEffect(() => {
    let isMounted = true;

    const checkAndNavigate = async () => {
      try {
        console.log("[BOOT 2] Index Router Reading AsyncStorage patientID...");
        const storedId = await AsyncStorage.getItem("patientID").catch(() => null);
        if (!isMounted) return;

        console.log("[BOOT 3] Patient ID read:", storedId);

        if (!storedId) {
          router.replace("/Welcome");
        } else {
          router.replace("/(tabs)/home");
        }
      } catch (e) {
        console.error("Error@app/index.tsx:", e);
        if (isMounted) router.replace("/Welcome");
      }
    };

    checkAndNavigate();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff", justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#22c55e" />
    </View>
  );
}
