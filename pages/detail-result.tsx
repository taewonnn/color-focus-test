import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { createRoute, useNavigation, useParams } from '@granite-js/react-native';
import type { ResultGrade, TestResult } from '../src/types';

const GRADE_INTERPRETATION: Record<ResultGrade, { title: string; tip: string }> = {
  S: {
    title: '집중력이 매우 높습니다. 색상과 글자를 거의 완벽하게 구분했어요.',
    tip: '이미 훌륭한 집중력이에요. 더 빠른 반응속도에 도전해보세요!',
  },
  A: {
    title: '집중력이 좋습니다. 대부분의 문제를 빠르고 정확하게 풀었어요.',
    tip: '조금만 더 빠르게 반응하면 S 등급도 가능해요!',
  },
  B: {
    title: '평균 이상의 집중력을 보였어요.',
    tip: '색깔에만 집중하고 단어 의미를 의식적으로 무시하는 연습을 해보세요.',
  },
  C: {
    title: '천천히 하면 더 좋아질 수 있어요.',
    tip: '먼저 색깔만 보는 연습을 해보세요. 반복할수록 점점 빨라집니다.',
  },
  D: {
    title: '처음엔 어려울 수 있어요. 괜찮아요!',
    tip: '급하지 않게 천천히 실제 색깔을 확인하는 것부터 시작해보세요.',
  },
};

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function DetailResultScreen() {
  const navigation = useNavigation();
  const { result } = useParams({ from: '/detail-result' }) as { result: TestResult };

  const {
    score,
    grade,
    accuracy,
    averageReactionMs,
    fastestReactionMs,
    slowestReactionMs,
    totalQuestions,
    correctCount,
    wrongCount,
  } = result;

  const interpretation = GRADE_INTERPRETATION[grade];

  const handleReplay = () => {
    navigation.navigate('/');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>상세 분석</Text>

        <View style={styles.summaryCard}>
          <View style={styles.summaryGradeRow}>
            <Text style={styles.summaryGrade}>{grade}</Text>
            <Text style={styles.summaryScore}>{score}점</Text>
          </View>
          <Text style={styles.summaryAccuracy}>
            정답률 {Math.round(accuracy * 100)}%
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>기록 상세</Text>
          <StatRow label="총 문제 수" value={`${totalQuestions}문제`} />
          <View style={styles.divider} />
          <StatRow label="정답 수" value={`${correctCount}개`} />
          <View style={styles.divider} />
          <StatRow label="오답 수" value={`${wrongCount}개`} />
          <View style={styles.divider} />
          <StatRow
            label="평균 반응속도"
            value={averageReactionMs != null ? `${averageReactionMs}ms` : '-'}
          />
          <View style={styles.divider} />
          <StatRow
            label="가장 빠른 반응"
            value={fastestReactionMs != null ? `${fastestReactionMs}ms` : '-'}
          />
          <View style={styles.divider} />
          <StatRow
            label="가장 느린 반응"
            value={slowestReactionMs != null ? `${slowestReactionMs}ms` : '-'}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>집중력 해석</Text>
          <Text style={styles.interpretationText}>{interpretation.title}</Text>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipLabel}>개선 팁</Text>
          <Text style={styles.tipText}>{interpretation.tip}</Text>
        </View>

        <TouchableOpacity
          style={styles.replayButton}
          onPress={handleReplay}
          activeOpacity={0.85}
        >
          <Text style={styles.replayButtonText}>다시 하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export const Route = createRoute('/detail-result', {
  component: DetailResultScreen,
  validateParams: (params: unknown) => params as { result: TestResult },
});

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    gap: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  summaryCard: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 24,
  },
  summaryGradeRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: 8,
  },
  summaryGrade: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 56,
  },
  summaryScore: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 40,
  },
  summaryAccuracy: {
    fontSize: 15,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 20,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  interpretationText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
  },
  tipCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    padding: 20,
  },
  tipLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 15,
    color: '#1D4ED8',
    lineHeight: 24,
    fontWeight: '500',
  },
  replayButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  replayButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
