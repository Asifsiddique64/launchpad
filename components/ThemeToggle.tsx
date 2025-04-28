import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { useTheme } from '../contexts/ThemeContext';
import { useThemeToggle } from '../contexts/ThemeToggleContext';

export default function ThemeToggle() {
  const { theme, setTheme, isDark } = useTheme();
  const { setShowThemeToggle } = useThemeToggle();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const options = [
    { label: 'Light', value: 'light', icon: 'sunny' },
    { label: 'Dark', value: 'dark', icon: 'moon' },
  ];

  const handleThemeSelect = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    setShowThemeToggle(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <Pressable
          key={option.value}
          style={[
            styles.option,
            { backgroundColor: colors.cardBackground },
            theme === option.value && { backgroundColor: colors.tint + '20' }
          ]}
          onPress={() => handleThemeSelect(option.value as 'light' | 'dark')}
        >
          <Ionicons name={option.icon as any} size={20} color={colors.text} />
          <Text style={[styles.label, { color: colors.text }]}>{option.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: 'transparent',
    borderRadius: 8,
    overflow: 'hidden',
    zIndex: 1000,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
  },
  label: {
    fontSize: 16,
  },
}); 