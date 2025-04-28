import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { useTheme } from '../contexts/ThemeContext';
import { Notice } from '../types/notice';

interface NoticeCardProps {
  notice: Notice;
  onPress: (notice: Notice) => void;
}

export default function NoticeCard({ notice, onPress }: NoticeCardProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Pressable
      style={[styles.card, { backgroundColor: colors.cardBackground }]}
      onPress={() => onPress(notice)}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{notice.title}</Text>
        {notice.isUnread && (
          <Ionicons name="ellipse" size={8} color={colors.pink} style={styles.unreadIndicator} />
        )}
      </View>
      
      {notice.subtitle && (
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{notice.subtitle}</Text>
      )}
      
      <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={3}>
        {notice.description}
      </Text>
      
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          {notice.hasAttachment && (
            <Ionicons name="attach" size={20} color={colors.textSecondary} />
          )}
        </View>
        <Text style={[styles.date, { color: colors.textSecondary }]}>
          {formatDate(notice.date)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  unreadIndicator: {
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLeft: {
    width: 20, // Match the width of the attachment icon
  },
  date: {
    fontSize: 12,
  },
}); 