import React from 'react';
import { StyleSheet, View } from 'react-native';
import { InlineAd } from '@apps-in-toss/framework';

const BANNER_AD_GROUP_ID = 'ait.v2.live.899f9d0f3be24188';

type BannerAdSlotProps = {
  placement: 'home_bottom' | 'result_bottom' | 'test_bottom';
};

export function BannerAdSlot(_: BannerAdSlotProps) {
  return (
    <View style={styles.container}>
      <InlineAd adGroupId={BANNER_AD_GROUP_ID} impressFallbackOnMount />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 96,
    overflow: 'hidden',
    marginTop: 24,
  },
});
