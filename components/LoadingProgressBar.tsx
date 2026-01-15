import { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { THEME } from '@/constants/theme';

interface LoadingProgressBarProps {
  progress: number;
  visible: boolean;
}

export default function LoadingProgressBar({
  progress,
  visible,
}: LoadingProgressBarProps) {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const width = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: opacityAnim }]}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width,
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
  progressBar: {
    height: '100%',
    backgroundColor: THEME.colors.brandOcean,
    shadowColor: THEME.colors.brandOcean,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});
