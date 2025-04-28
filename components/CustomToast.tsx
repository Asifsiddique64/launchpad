import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { Colors } from '../constants/Colors';
import { useTheme } from '../contexts/ThemeContext';

interface CustomToastProps {
  message: string;
  subMessage?: string;
  onHide: () => void;
}

export default function CustomToast({ message, subMessage, onHide }: CustomToastProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const [mounted, setMounted] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    setMounted(true);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(5000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.cardBackground,
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Text style={[styles.message, { color: colors.text }]}>{message}</Text>
      {subMessage && (
        <Text style={[styles.subMessage, { color: colors.textSecondary }]}>
          {subMessage}
        </Text>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  message: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  subMessage: {
    fontSize: 14,
  },
}); 