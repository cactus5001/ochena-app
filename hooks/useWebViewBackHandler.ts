import { useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';

export function useWebViewBackHandler(
  canGoBack: boolean,
  goBack: () => void
) {
  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (canGoBack) {
          goBack();
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [canGoBack, goBack]);
}
