import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { createRoute, useNavigation, useParams } from '@granite-js/react-native';
import { BannerAdSlot } from '../src/components/BannerAdSlot';
import { useFullScreenAd } from '../src/hooks/useFullScreenAd';
import { ResultSummary } from '../src/components/ResultSummary';
import type { TestResult } from '../src/types';

const REPLAY_AD_GROUP_ID = 'ait.dev.43daa14da3ae487b';

function ResultScreen() {
  const navigation = useNavigation();
  const { result } = useParams({ from: '/result' }) as { result: TestResult };
  const { show: showAd } = useFullScreenAd(REPLAY_AD_GROUP_ID);

  const handleReplay = () => {
    showAd(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigation as any).replace('/test');
    });
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: [
          '청기백기 색깔 테스트 결과!',
          `집중력 등급: ${result.grade}`,
          `점수: ${result.score}점`,
          `정답률: ${Math.round(result.accuracy * 100)}%`,
          `평균 반응속도: ${result.averageReactionMs != null ? `${result.averageReactionMs}ms` : '-'}`,
        ].join('\n'),
      });
    } catch {
      // share API error - noop
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <ResultSummary result={result} />

        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleReplay} activeOpacity={0.85}>
            <Text style={styles.primaryButtonText}>광고 보고 다시 하기</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleShare} activeOpacity={0.85}>
            <Text style={styles.secondaryButtonText}>공유하기</Text>
          </TouchableOpacity>
        </View>

        <BannerAdSlot placement="result_bottom" />
      </ScrollView>
    </SafeAreaView>
  );
}

export const Route = createRoute('/result', {
  component: ResultScreen,
  screenOptions: { headerShown: false },
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
    paddingBottom: 32,
  },
  actions: {
    marginTop: 32,
    gap: 12,
  },
  primaryButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
});
