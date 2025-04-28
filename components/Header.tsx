import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { useTheme } from '../contexts/ThemeContext';
import { useThemeToggle } from '../contexts/ThemeToggleContext';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { isDark } = useTheme();
  const { setShowThemeToggle } = useThemeToggle();
  const colors = Colors[isDark ? 'dark' : 'light'];

  return (
    <Stack.Screen
      options={{
        title,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerRight: () => (
          <Pressable
            onPress={() => setShowThemeToggle(true)}
            style={styles.themeButton}
          >
            <Ionicons
              name={isDark ? "moon" : "sunny"}
              size={24}
              color={colors.text}
            />
          </Pressable>
        ),
      }}
    />
  );
}

const styles = StyleSheet.create({
  themeButton: {
    marginRight: 16,
  },
}); 