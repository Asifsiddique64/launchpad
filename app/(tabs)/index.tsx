import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../contexts/ThemeContext';

export default function HomeScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Home" />

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Welcome to Notice Board</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Stay updated with the latest notices and announcements
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});
