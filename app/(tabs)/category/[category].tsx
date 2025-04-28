import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import NoticeCard from '../../../components/NoticeCard';
import { Colors } from '../../../constants/Colors';
import { useTheme } from '../../../contexts/ThemeContext';
import { useThemeToggle } from '../../../contexts/ThemeToggleContext';
import { mockNotices } from '../../../data/mockNotices';
import { Notice } from '../../../types/notice';

export default function CategoryNoticeScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const { isDark } = useTheme();
  const { setShowThemeToggle } = useThemeToggle();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const [notices, setNotices] = useState(mockNotices.filter(n => n.category === category));
  const [isLoading, setIsLoading] = useState(false);

  const filteredNotices = notices.filter(notice =>
    notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notice.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNoticePress = (notice: Notice) => {
    // Handle notice press - you can navigate to detail screen here
    console.log('Notice pressed:', notice);
  };

  const loadMoreNotices = useCallback(() => {
    if (isLoading) return;
    
    setIsLoading(true);
    Toast.show({
      type: 'info',
      text1: 'Fetching more notices...',
    });

    // Simulate API call
    setTimeout(() => {
      setNotices(prevNotices => [...prevNotices, ...mockNotices.filter(n => n.category === category)]);
      setIsLoading(false);
    }, 1000);
  }, [isLoading, category]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: `${category} Notices`,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerRight: () => (
            <Pressable
              onPress={() => setShowThemeToggle(true)}
              style={{ marginRight: 16 }}
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

      <TextInput
        style={[styles.searchInput, { 
          backgroundColor: colors.cardBackground,
          color: colors.text,
          borderColor: colors.textSecondary,
        }]}
        placeholder="Search notices..."
        placeholderTextColor={colors.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredNotices}
        renderItem={({ item }) => (
          <NoticeCard notice={item} onPress={handleNoticePress} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMoreNotices}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  listContent: {
    padding: 16,
  },
}); 