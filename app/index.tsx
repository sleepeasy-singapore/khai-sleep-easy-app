import { router } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useShareIntentContext } from "expo-share-intent";

/**
 * Root router entry: checks session storage and routes immediately to Welcome, WelcomeBack, or Share.
 */
export default function Index() {
  const { hasShareIntent, shareIntent } = useShareIntentContext();

  useEffect(() => {
    let isMounted = true;

    const checkAndNavigate = async () => {
      try {
        console.log("[BOOT 2] Index Router Reading AsyncStorage patientID...");
        const storedId = await AsyncStorage.getItem("patientID");
        if (!isMounted) return;

        console.log("[BOOT 3] Patient ID read:", storedId, "Share intent:", hasShareIntent);

        // If share intent exists route to Share (highest priority)
        if (hasShareIntent && shareIntent) {
          router.replace("/Share");
          return;
        }

        // If no ID found route to Welcome, otherwise go to WelcomeBack
        if (!storedId) {
          router.replace("/Welcome");
          return;
        }

        router.replace("/WelcomeBack");
      } catch (e) {
        console.error("Error@app/index.tsx:", e);
        if (isMounted) router.replace("/Welcome");
      }
    };

    checkAndNavigate();

    return () => {
      isMounted = false;
    };
  }, [hasShareIntent, shareIntent]);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff", justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#22c55e" />
    </View>
  );
}
