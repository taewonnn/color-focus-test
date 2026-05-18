import { loadFullScreenAd, showFullScreenAd } from '@apps-in-toss/framework';
import { useEffect, useRef } from 'react';

export function useFullScreenAd(adGroupId: string) {
  const isLoadedRef = useRef(false);

  useEffect(() => {
    if (!loadFullScreenAd.isSupported()) return;

    const unregister = loadFullScreenAd({
      options: { adGroupId },
      onEvent: (event) => {
        if (event.type === 'loaded') isLoadedRef.current = true;
      },
      onError: () => {},
    });

    return () => {
      isLoadedRef.current = false;
      unregister();
    };
  }, [adGroupId]);

  const show = (onDismissed: () => void) => {
    if (!showFullScreenAd.isSupported() || !isLoadedRef.current) {
      onDismissed();
      return;
    }

    showFullScreenAd({
      options: { adGroupId },
      onEvent: (event) => {
        if (event.type === 'dismissed' || event.type === 'failedToShow') {
          onDismissed();
        }
      },
      onError: () => onDismissed(),
    });
  };

  return { show };
}
