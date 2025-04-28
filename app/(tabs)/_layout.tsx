import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import ThemeToggle from "@/components/ThemeToggle";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { ThemeToggleProvider, useThemeToggle } from "@/contexts/ThemeToggleContext";

function TabLayoutContent() {
  const { isDark } = useTheme();
  const { showThemeToggle, setShowThemeToggle } = useThemeToggle();
  const colors = Colors[isDark ? 'dark' : 'light'];

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.tint,
          tabBarInactiveTintColor: colors.tabIconDefault,
          tabBarStyle: {
            backgroundColor: colors.background,
            ...Platform.select({
              ios: {
                position: "absolute",
              },
              default: {},
            }),
          },
          headerShown: true,
          tabBarButton: (props) => (
            <HapticTab
              {...props}
              onPress={(e) => {
                setShowThemeToggle(false);
                props.onPress?.(e);
              }}
            />
          ),
          tabBarBackground: TabBarBackground,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="notices"
          options={{
            title: "Notices",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="category/[category]"
          options={{
            href: null,
          }}
        />
      </Tabs>
      {showThemeToggle && <ThemeToggle />}
    </View>
  );
}

export default function TabLayout() {
  return (
    <ThemeProvider>
      <ThemeToggleProvider>
        <TabLayoutContent />
      </ThemeToggleProvider>
    </ThemeProvider>
  );
}
