import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_HEX } from '../constants/colors';
import type { ColorKey } from '../types';

type ColorWordCardProps = {
  label: string;
  color: ColorKey;
};

export function ColorWordCard({ label, color }: ColorWordCardProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.word, { color: COLOR_HEX[color] }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  word: {
    fontSize: 64,
    fontWeight: '800',
  },
});
