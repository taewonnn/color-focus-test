import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createRoute, useNavigation } from '@granite-js/react-native';
import { BannerAdSlot } from '../src/components/BannerAdSlot';
import { COLOR_HEX } from '../src/constants/colors';
import { useFullScreenAd } from '../src/hooks/useFullScreenAd';
import { useReplayGate } from '../src/context/ReplayGateContext';

const REPLAY_AD_GROUP_ID = 'ait.v2.live.6fcde824549b486a';

function HomeScreen() {
  const navigation = useNavigation();
  const { replayRequired, clearReplayRequirement } = useReplayGate();
  const { show: showAd, isReady, isSupported } = useFullScreenAd(REPLAY_AD_GROUP_ID);
  const isReplayBlocked = replayRequired && !isReady;

  const handleStart = () => {
    if (!replayRequired) {
      navigation.navigate('/test');
      return;
    }

    const opened = showAd(() => {
      clearReplayRequirement();
      navigation.navigate('/test');
    });

    if (!opened) {
      return;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>청기백기 색깔 테스트</Text>
          <Text style={styles.heroSubtitle}>읽지 말고, 색깔을 고르세요.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>규칙</Text>
          <Text style={styles.cardText}>
            글자의 뜻이 아니라 실제 글자 색깔을 고르세요.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>예시</Text>
          <Text style={styles.exampleHint}>이 글자의 실제 색깔은?</Text>
          <View style={styles.exampleWordWrap}>
            <Text style={[styles.exampleWord, { color: COLOR_HEX['blue'] }]}>빨강</Text>
          </View>
          <View style={styles.exampleAnswerRow}>
            <View style={styles.exampleAnswerBadge}>
              <Text style={styles.exampleAnswerText}>정답: 파랑</Text>
            </View>
          </View>
          <Text style={styles.exampleDesc}>
            글자의 의미(빨강)가 아니라{'\n'}실제 글자 색깔(파랑)을 고르세요.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.startButton, isReplayBlocked && styles.startButtonDisabled]}
          onPress={handleStart}
          activeOpacity={0.85}
          disabled={isReplayBlocked}
        >
          <Text style={styles.startButtonText}>
            {replayRequired
              ? isReady
                ? '광고 보고 다시 시작하기'
                : '광고 준비 중...'
              : '시작하기'}
          </Text>
        </TouchableOpacity>
        {replayRequired && (
          <Text style={styles.startHint}>
            {isSupported
              ? '한 번 더 하려면 광고를 보고 다시 시작해야 해요.'
              : '현재 환경에서는 광고를 불러올 수 없어서 다시 시작할 수 없어요.'}
          </Text>
        )}

        <BannerAdSlot placement="home_bottom" />
      </ScrollView>
    </SafeAreaView>
  );
}

export const Route = createRoute('/', {
  component: HomeScreen,
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
  hero: {
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 24,
  },
  exampleHint: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  exampleWordWrap: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  exampleWord: {
    fontSize: 52,
    fontWeight: '800',
  },
  exampleAnswerRow: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  exampleAnswerBadge: {
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  exampleAnswerText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#16A34A',
  },
  exampleDesc: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
    textAlign: 'center',
  },
  startButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  startButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  startButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  startHint: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 20,
    color: '#6B7280',
    textAlign: 'center',
  },
});
