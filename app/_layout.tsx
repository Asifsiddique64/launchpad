import { Colors } from "@/constants/Colors";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import Toast, { BaseToast, ErrorToast, ToastProps } from 'react-native-toast-message';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function ToastConfig() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toastConfig = {
    success: (props: ToastProps) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: colors.tint,
          backgroundColor: colors.cardBackground,
        }}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        text1Style={{
          fontSize: 15,
          fontWeight: '600',
          color: colors.text,
        }}
        text2Style={{
          fontSize: 13,
          color: colors.textSecondary,
        }}
      />
    ),
    error: (props: ToastProps) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: colors.pink,
          backgroundColor: colors.cardBackground,
        }}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        text1Style={{
          fontSize: 15,
          fontWeight: '600',
          color: colors.text,
        }}
        text2Style={{
          fontSize: 13,
          color: colors.textSecondary,
        }}
      />
    ),
  };

  return <Toast config={toastConfig} />;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    setMounted(true);
  }, [loaded]);

  if (!loaded || !mounted) {
    return null;
  }

  return (
    <ThemeProvider>
      <NavigationThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="about" options={{ title: "About" }} />
        </Stack>
        <StatusBar style="auto" />
        <ToastConfig />
      </NavigationThemeProvider>
    </ThemeProvider>
  );
}
