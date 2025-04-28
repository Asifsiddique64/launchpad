import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { useTheme } from '../contexts/ThemeContext';

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = [
  'All',
  'Academics',
  'Events',
  'Sports',
  'General',
];

export default function CategorySelector({ selectedCategory, onSelectCategory }: CategorySelectorProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {categories.map((category) => (
          <Pressable
            key={category}
            style={[
              styles.category,
              { backgroundColor: colors.cardBackground },
              selectedCategory === category && { backgroundColor: colors.tint + '20' }
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                { color: colors.text },
                selectedCategory === category && { color: colors.tint }
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },
  container: {
    maxHeight: 40,
  },
  content: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center',
  },
  category: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 