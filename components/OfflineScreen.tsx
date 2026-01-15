import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { WifiOff } from 'lucide-react-native';
import { THEME, OCHENA_LOGO_URL } from '@/constants/theme';

interface OfflineScreenProps {
  onRetry: () => void;
}

export default function OfflineScreen({ onRetry }: OfflineScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: OCHENA_LOGO_URL }}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.iconContainer}>
          <WifiOff size={64} color={THEME.colors.brandOcean} strokeWidth={1.5} />
        </View>

        <Text style={styles.title}>No Internet Connection</Text>
        <Text style={styles.subtitle}>
          Please check your connection and try again
        </Text>

        <TouchableOpacity
          style={styles.retryButton}
          onPress={onRetry}
          activeOpacity={0.8}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.creamyWhite,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.xl,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: THEME.spacing.xxl,
  },
  iconContainer: {
    marginBottom: THEME.spacing.lg,
    opacity: 0.8,
  },
  title: {
    ...THEME.typography.title,
    color: THEME.colors.charcoal,
    marginBottom: THEME.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...THEME.typography.body,
    color: THEME.colors.charcoal,
    opacity: 0.6,
    marginBottom: THEME.spacing.xl,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: THEME.colors.brandOcean,
    paddingHorizontal: THEME.spacing.xl,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.lg,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: THEME.colors.brandOcean,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  retryButtonText: {
    ...THEME.typography.subtitle,
    color: THEME.colors.white,
  },
});
