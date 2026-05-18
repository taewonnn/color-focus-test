import React from 'react';
import { StyleSheet, View } from 'react-native';
import { InlineAd } from '@apps-in-toss/framework';

const AD_GROUP_IDS: Record<'home_bottom' | 'result_bottom' | 'test_bottom', string> = {
  home_bottom: 'ait.v2.live.899f9d0f3be24188',
  result_bottom: 'ait.v2.live.9a95150b2d6149c6',
  test_bottom: 'ait.v2.live.899f9d0f3be24188',
};

type BannerAdSlotProps = {
  placement: 'home_bottom' | 'result_bottom' | 'test_bottom';
};

export function BannerAdSlot({ placement }: BannerAdSlotProps) {
  const isFixed = placement !== 'result_bottom';
  return (
    <View style={[styles.container, isFixed ? styles.fixed : styles.inline]}>
      <InlineAd adGroupId={AD_GROUP_IDS[placement]} impressFallbackOnMount />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 24,
  },
  fixed: {
    height: 96,
    overflow: 'hidden',
  },
  inline: {},
});
