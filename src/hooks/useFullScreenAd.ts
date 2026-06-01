import { loadFullScreenAd, showFullScreenAd } from '@apps-in-toss/framework';
import { useEffect, useRef, useState } from 'react';

export function useFullScreenAd(adGroupId: string) {
  const isLoadedRef = useRef(false);
  const [isSupported, setIsSupported] = useState(loadFullScreenAd.isSupported());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const supported = loadFullScreenAd.isSupported();
    setIsSupported(supported);
    isLoadedRef.current = false;
    setIsReady(false);

    if (!supported) return;

    const unregister = loadFullScreenAd({
      options: { adGroupId },
      onEvent: (event) => {
        if (event.type === 'loaded') {
          isLoadedRef.current = true;
          setIsReady(true);
        }
      },
      onError: () => {
        isLoadedRef.current = false;
        setIsReady(false);
      },
    });

    return () => {
      isLoadedRef.current = false;
      setIsReady(false);
      unregister();
    };
  }, [adGroupId]);

  const show = (onDismissed: () => void) => {
    if (!showFullScreenAd.isSupported() || !isLoadedRef.current) {
      return false;
    }

    isLoadedRef.current = false;
    setIsReady(false);

    showFullScreenAd({
      options: { adGroupId },
      onEvent: (event) => {
        if (event.type === 'dismissed') {
          onDismissed();
        }
      },
      onError: () => {
        isLoadedRef.current = false;
        setIsReady(false);
      },
    });

    return true;
  };

  return { show, isReady, isSupported };
}
