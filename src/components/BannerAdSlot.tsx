import React from 'react';
import { StyleSheet, View } from 'react-native';

type BannerAdSlotProps = {
  placement: 'home_bottom' | 'result_bottom' | 'test_bottom';
};

// Placeholder — real implementation uses @apps-in-toss/framework InlineAd
export function BannerAdSlot(_: BannerAdSlotProps) {
  return <View style={styles.placeholder} />;
}

const styles = StyleSheet.create({
  placeholder: {
    height: 96,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginTop: 24,
  },
});
