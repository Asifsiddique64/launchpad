import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CategorySelector from '../../components/CategorySelector';
import CustomToast from '../../components/CustomToast';
import Header from '../../components/Header';
import NoticeCard from '../../components/NoticeCard';
import SearchInput from '../../components/SearchInput';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../contexts/ThemeContext';
import { mockNotices } from '../../data/mockNotices';
import { Notice } from '../../types/notice';

export default function NoticeListScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const [notices, setNotices] = useState(mockNotices);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showToast, setShowToast] = useState(false);

  const filteredNotices = notices.filter(notice =>
    (selectedCategory === 'All' || notice.category === selectedCategory) &&
    (notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notice.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleNoticePress = (notice: Notice) => {
    // Handle notice press - you can navigate to detail screen here
    console.log('Notice pressed:', notice);
  };

  const loadMoreNotices = useCallback(() => {
    if (isLoading) return;
    
    setIsLoading(true);
    setShowToast(true);

    // Simulate API call
    setTimeout(() => {
      const newNotices = mockNotices.map(notice => ({
        ...notice,
        id: `${notice.id}-${page + 1}`,
      }));
      setNotices(prevNotices => [...prevNotices, ...newNotices]);
      setPage(prev => prev + 1);
      setIsLoading(false);
    }, 1000);
  }, [isLoading, page]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title={`${selectedCategory} Notices`} />

      <SearchInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search notices..."
      />

      <CategorySelector
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
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

      {showToast && (
        <CustomToast
          message="Fetching more notices..."
          subMessage="Please wait while we load more notices"
          onHide={() => setShowToast(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
}); 