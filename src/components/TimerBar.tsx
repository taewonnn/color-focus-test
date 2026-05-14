import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

type TimerBarProps = {
  remainingMs: number;
  totalMs: number;
};

export function TimerBar({ remainingMs, totalMs }: TimerBarProps) {
  const progressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const ratio = Math.max(0, remainingMs / totalMs);
    Animated.timing(progressAnim, {
      toValue: ratio,
      duration: 80,
      useNativeDriver: false,
    }).start();
  }, [remainingMs, totalMs, progressAnim]);

  const animatedWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const isLow = remainingMs <= 5000;

  return (
    <View style={styles.track}>
      <Animated.View
        style={[
          styles.bar,
          { width: animatedWidth, backgroundColor: isLow ? '#F59E0B' : '#2563EB' },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  bar: {
    height: 6,
    borderRadius: 3,
  },
});
