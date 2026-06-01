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
import { createRoute, useBackEvent, useNavigation, useParams } from '@granite-js/react-native';
import { BannerAdSlot } from '../src/components/BannerAdSlot';
import { useReplayGate } from '../src/context/ReplayGateContext';
import { useFullScreenAd } from '../src/hooks/useFullScreenAd';
import { ResultSummary } from '../src/components/ResultSummary';
import type { TestResult } from '../src/types';

const REPLAY_AD_GROUP_ID = 'ait.v2.live.6fcde824549b486a';

function ResultScreen() {
  const navigation = useNavigation();
  const backEvent = useBackEvent();
  const { requireReplay, clearReplayRequirement } = useReplayGate();
  const { result } = useParams({ from: '/result' }) as { result: TestResult };
  const { show: showAd, isReady } = useFullScreenAd(REPLAY_AD_GROUP_ID);

  React.useEffect(() => {
    requireReplay();
  }, [requireReplay]);

  React.useEffect(() => {
    const handleBack = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigation as any).replace('/');
    };

    backEvent.addEventListener(handleBack);

    return () => {
      backEvent.removeEventListener(handleBack);
    };
  }, [backEvent, navigation]);

  const handleReplay = () => {
    const opened = showAd(() => {
      clearReplayRequirement();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigation as any).replace('/test');
    });

    if (!opened) {
      return;
    }
  };

  const handleShare = async () => {
    try {
      let shareLink = '';
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { getTossShareLink } = require('@apps-in-toss/native-modules');
        shareLink = await getTossShareLink('intoss://color-focus-test');
      } catch {
        // 링크 생성 실패 시 텍스트만 공유
      }

      const summary = [
        '청기백기 색깔 테스트 결과!',
        `집중력 등급: ${result.grade}`,
        `점수: ${result.score}점`,
        `정답률: ${Math.round(result.accuracy * 100)}%`,
        `평균 반응속도: ${result.averageReactionMs != null ? `${result.averageReactionMs}ms` : '-'}`,
      ].join('\n');

      await Share.share({
        message: shareLink ? `${summary}\n\n${shareLink}` : summary,
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
          <TouchableOpacity
            style={[styles.primaryButton, !isReady && styles.primaryButtonDisabled]}
            onPress={handleReplay}
            activeOpacity={0.85}
            disabled={!isReady}
          >
            <Text style={styles.primaryButtonText}>
              {isReady ? '광고 보고 다시 하기' : '광고 준비 중...'}
            </Text>
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
  validateParams: (params: unknown) => params as { result: TestResult },
});

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
  primaryButtonDisabled: {
    backgroundColor: '#9CA3AF',
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
