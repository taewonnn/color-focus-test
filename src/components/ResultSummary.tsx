import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ResultGrade, TestResult } from '../types';

const GRADE_INFO: Record<ResultGrade, { label: string; description: string }> = {
  S: {
    label: '놀라운 집중력이에요!',
    description: '색상과 글자를 빠르게 구분하는 능력이 뛰어납니다.',
  },
  A: {
    label: '집중력이 꽤 좋아요.',
    description: '빠른 속도로 정확하게 색상을 골랐습니다.',
  },
  B: {
    label: '무난한 집중력이에요.',
    description: '조금만 더 빠르게 고르면 더 높은 점수를 받을 수 있어요.',
  },
  C: {
    label: '조금만 더 차분히 해보세요.',
    description: '급하게 누르기보다 실제 색깔을 먼저 확인하는 것이 좋아요.',
  },
  D: {
    label: '처음엔 어려울 수 있어요.',
    description: '천천히 실제 색깔을 보고 다시 도전해보세요.',
  },
};

type ResultSummaryProps = {
  result: TestResult;
};

export function ResultSummary({ result }: ResultSummaryProps) {
  const { score, grade, accuracy, averageReactionMs, totalQuestions, correctCount, wrongCount } =
    result;
  const gradeInfo = GRADE_INFO[grade];

  return (
    <View style={styles.container}>
      <Text style={styles.grade}>{grade}</Text>
      <Text style={styles.gradeLabel}>{gradeInfo.label}</Text>
      <Text style={styles.gradeDescription}>{gradeInfo.description}</Text>

      <Text style={styles.score}>{score}점</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{Math.round(accuracy * 100)}%</Text>
          <Text style={styles.statLabel}>정답률</Text>
        </View>
        <View style={[styles.statCard, styles.statCardRight]}>
          <Text style={styles.statValue}>
            {averageReactionMs != null ? `${averageReactionMs}ms` : '-'}
          </Text>
          <Text style={styles.statLabel}>평균 반응속도</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalQuestions}문제</Text>
          <Text style={styles.statLabel}>총 문제 수</Text>
        </View>
        <View style={[styles.statCard, styles.statCardRight]}>
          <Text style={styles.statValue}>
            {correctCount} / {wrongCount}
          </Text>
          <Text style={styles.statLabel}>정답 / 오답</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 16,
  },
  grade: {
    fontSize: 56,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 64,
  },
  gradeLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
    textAlign: 'center',
  },
  gradeDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  score: {
    fontSize: 40,
    fontWeight: '800',
    color: '#111827',
    marginTop: 24,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    alignItems: 'center',
  },
  statCardRight: {},
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
});
