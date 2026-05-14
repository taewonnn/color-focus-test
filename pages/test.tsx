import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createRoute, useNavigation } from '@granite-js/react-native';
import { ColorChoiceButton } from '../src/components/ColorChoiceButton';
import { ColorWordCard } from '../src/components/ColorWordCard';
import { TimerBar } from '../src/components/TimerBar';
import { COLORS, COLOR_LABELS } from '../src/constants/colors';
import { useTestGame } from '../src/hooks/useTestGame';
import type { TestResult } from '../src/types';

function TestScreen() {
  const navigation = useNavigation();

  const { currentQuestion, remainingMs, totalMs, score, isDisabled, feedback, handleAnswer } =
    useTestGame((result: TestResult) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigation as any).replace('/result', { result });
    });

  const remainingSeconds = Math.ceil(remainingMs / 1000);
  const isLow = remainingSeconds <= 5;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.statusRow}>
            <Text style={[styles.timerText, isLow && styles.timerLow]}>
              {remainingSeconds}초
            </Text>
            <Text style={styles.scoreText}>{score}점</Text>
          </View>
          <TimerBar remainingMs={remainingMs} totalMs={totalMs} />
        </View>

        <View style={styles.questionArea}>
          <View style={styles.feedbackRow}>
            {feedback === 'correct' && (
              <View style={styles.feedbackCorrect}>
                <Text style={styles.feedbackCorrectText}>정답!</Text>
              </View>
            )}
            {feedback === 'incorrect' && (
              <View style={styles.feedbackIncorrect}>
                <Text style={styles.feedbackIncorrectText}>오답</Text>
              </View>
            )}
            {feedback == null && <View style={styles.feedbackPlaceholder} />}
          </View>
          <ColorWordCard
            label={currentQuestion.wordLabel}
            color={currentQuestion.textColor}
          />
        </View>

        <View style={styles.buttonsArea}>
          <View style={styles.buttonRow}>
            {COLORS.slice(0, 2).map((colorKey) => (
              <ColorChoiceButton
                key={colorKey}
                colorKey={colorKey}
                label={COLOR_LABELS[colorKey]}
                onPress={() => handleAnswer(colorKey)}
                disabled={isDisabled}
              />
            ))}
          </View>
          <View style={[styles.buttonRow, styles.buttonRowBottom]}>
            {COLORS.slice(2, 4).map((colorKey) => (
              <ColorChoiceButton
                key={colorKey}
                colorKey={colorKey}
                label={COLOR_LABELS[colorKey]}
                onPress={() => handleAnswer(colorKey)}
                disabled={isDisabled}
              />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export const Route = createRoute('/test', {
  component: TestScreen,
});

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  header: {
    gap: 10,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  timerLow: {
    color: '#F59E0B',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
  },
  questionArea: {
    flex: 1,
  },
  feedbackRow: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  feedbackPlaceholder: {
    height: 28,
  },
  feedbackCorrect: {
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  feedbackCorrectText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#16A34A',
  },
  feedbackIncorrect: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  feedbackIncorrectText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#DC2626',
  },
  buttonsArea: {
    gap: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonRowBottom: {},
});
