import type { ColorKey, TestQuestion } from '../types';
import { COLORS, COLOR_LABELS } from '../constants/colors';

export function generateQuestion(prevQuestion?: TestQuestion): TestQuestion {
  let wordColorKey: ColorKey;
  let textColor: ColorKey;
  let attempts = 0;

  do {
    wordColorKey = COLORS[Math.floor(Math.random() * COLORS.length)] as ColorKey;
    do {
      textColor = COLORS[Math.floor(Math.random() * COLORS.length)] as ColorKey;
    } while (textColor === wordColorKey);
    attempts++;
  } while (
    attempts < 20 &&
    prevQuestion != null &&
    COLOR_LABELS[wordColorKey] === prevQuestion.wordLabel &&
    textColor === prevQuestion.textColor
  );

  return {
    id: `${Date.now()}-${Math.random()}`,
    wordLabel: COLOR_LABELS[wordColorKey],
    textColor,
    correctColor: textColor,
    shownAt: Date.now(),
  };
}
