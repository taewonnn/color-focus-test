import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLOR_HEX, COLOR_TEXT } from '../constants/colors';
import type { ColorKey } from '../types';

type ColorChoiceButtonProps = {
  colorKey: ColorKey;
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function ColorChoiceButton({ colorKey, label, onPress, disabled }: ColorChoiceButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: COLOR_HEX[colorKey], opacity: disabled ? 0.6 : 1 }]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.75}
    >
      <Text style={[styles.label, { color: COLOR_TEXT[colorKey] }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 64,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
  },
});
