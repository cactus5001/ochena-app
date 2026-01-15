import { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';
import OfflineScreen from '@/components/OfflineScreen';
import LoadingProgressBar from '@/components/LoadingProgressBar';
import { useWebViewBackHandler } from '@/hooks/useWebViewBackHandler';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { THEME, OCHENA_URL, CUSTOM_USER_AGENT } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const isConnected = useNetworkStatus();

  const handleGoBack = useCallback(() => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  }, [canGoBack]);

  useWebViewBackHandler(canGoBack, handleGoBack);

  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, []);

  const handleLoadProgress = useCallback(
    ({ nativeEvent }: { nativeEvent: { progress: number } }) => {
      setLoadingProgress(nativeEvent.progress);
    },
    []
  );

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
    setLoadingProgress(1);
    if (showSplash) {
      setTimeout(() => {
        SplashScreen.hideAsync();
        setShowSplash(false);
      }, 500);
    }
  }, [showSplash]);

  const handleNavigationStateChange = useCallback((navState: any) => {
    setCanGoBack(navState.canGoBack);
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    webViewRef.current?.reload();
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleRetry = useCallback(() => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    handleRefresh();
  }, [handleRefresh]);

  useEffect(() => {
    if (!showSplash) {
      return;
    }
    const timer = setTimeout(() => {
      if (!isLoading) {
        SplashScreen.hideAsync();
        setShowSplash(false);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isLoading, showSplash]);

  if (isConnected === false) {
    return (
      <>
        <StatusBar style="dark" />
        <OfflineScreen onRetry={handleRetry} />
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      <LoadingProgressBar progress={loadingProgress} visible={isLoading} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={THEME.colors.brandOcean}
            colors={[THEME.colors.brandOcean]}
          />
        }
      >
        <View style={styles.webViewContainer}>
          <WebView
            ref={webViewRef}
            source={{ uri: OCHENA_URL }}
            style={styles.webView}
            onLoadStart={handleLoadStart}
            onLoadProgress={handleLoadProgress}
            onLoadEnd={handleLoadEnd}
            onNavigationStateChange={handleNavigationStateChange}
            domStorageEnabled
            javaScriptEnabled
            startInLoadingState
            allowsBackForwardNavigationGestures
            userAgent={`${Platform.OS === 'ios' ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1' : 'Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'} ${CUSTOM_USER_AGENT}`}
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            sharedCookiesEnabled
            thirdPartyCookiesEnabled
            cacheEnabled
            incognito={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.creamyWhite,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  webViewContainer: {
    flex: 1,
    minHeight: '100%',
  },
  webView: {
    flex: 1,
    backgroundColor: THEME.colors.creamyWhite,
  },
});
