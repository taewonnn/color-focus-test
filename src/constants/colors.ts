import type { ColorKey } from '../types';

export const COLORS: ColorKey[] = ['red', 'blue', 'yellow', 'green'];

export const COLOR_LABELS: Record<ColorKey, string> = {
  red: '빨강',
  blue: '파랑',
  yellow: '노랑',
  green: '초록',
};

export const COLOR_HEX: Record<ColorKey, string> = {
  red: '#EF4444',
  blue: '#2563EB',
  yellow: '#FACC15',
  green: '#22C55E',
};

export const COLOR_TEXT: Record<ColorKey, string> = {
  red: '#FFFFFF',
  blue: '#FFFFFF',
  yellow: '#111827',
  green: '#FFFFFF',
};
