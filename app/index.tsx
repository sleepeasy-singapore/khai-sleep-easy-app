import { router, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useShareIntentContext } from "expo-share-intent";

/**
 * This page is just to redirect users to the actual home page due to how expo router works
 */
export default function Index() {
  const { hasShareIntent, shareIntent } = useShareIntentContext();
  const navState = useRootNavigationState();

  useEffect(() => {
    let handled = false;

    const checkAndNavigate = async () => {
      if (handled) return;
      handled = true;

      try {
        const storedId = await AsyncStorage.getItem("patientID");

        // If share intent exists route to Share (highest priority)
        if (hasShareIntent && shareIntent) {
          router.replace("/Share");
          return;
        }

        // If no ID found route to Welcome, otherwise go Home
        if (!storedId) {
          router.replace("/Welcome");
          return;
        }

        router.replace("/WelcomeBack");
      } catch (e) {
        console.error("Error@app/index.tsx:", e);
        router.replace("/Welcome");
      }
    };

    if (navState?.key) {
      checkAndNavigate();
    } else {
      const fallbackTimer = setTimeout(checkAndNavigate, 400);
      return () => clearTimeout(fallbackTimer);
    }
  }, [navState?.key, hasShareIntent, shareIntent]);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff", justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#22c55e" />
    </View>
  );
}
