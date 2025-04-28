import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../contexts/ThemeContext';
import { useThemeToggle } from '../../contexts/ThemeToggleContext';

export default function ExploreScreen() {
  const { isDark } = useTheme();
  const { setShowThemeToggle } = useThemeToggle();
  const colors = Colors[isDark ? 'dark' : 'light'];

  const features = [
    {
      title: 'Theme Support',
      description: 'Light and dark theme with smooth transitions',
      icon: 'color-palette',
    },
    {
      title: 'Category Filtering',
      description: 'Filter notices by different categories',
      icon: 'filter',
    },
    {
      title: 'Search Functionality',
      description: 'Search through notices with real-time filtering',
      icon: 'search',
    },
    {
      title: 'Infinite Scroll',
      description: 'Load more notices as you scroll',
      icon: 'infinite',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Explore" />

      <ScrollView style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Features</Text>
        
        <View style={styles.features}>
          {features.map((feature, index) => (
            <View
              key={index}
              style={[styles.featureCard, { backgroundColor: colors.cardBackground }]}
            >
              <Ionicons name={feature.icon as any} size={24} color={colors.tint} />
              <Text style={[styles.featureTitle, { color: colors.text }]}>
                {feature.title}
              </Text>
              <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                {feature.description}
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.themeSection, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Theme Settings</Text>
          <Pressable
            style={[styles.themeButton, { backgroundColor: colors.tint + '20' }]}
            onPress={() => setShowThemeToggle(true)}
          >
            <Ionicons
              name={isDark ? "moon" : "sunny"}
              size={24}
              color={colors.tint}
            />
            <Text style={[styles.themeButtonText, { color: colors.tint }]}>
              {isDark ? 'Dark Theme' : 'Light Theme'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  features: {
    gap: 16,
  },
  featureCard: {
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  themeSection: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  themeButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
