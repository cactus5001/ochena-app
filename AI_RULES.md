# AI Editor Rules for Ochena Mobile

This document outlines the technical stack and specific guidelines for making modifications to the Ochena Mobile application codebase.

## Tech Stack Summary

1.  **Platform:** React Native (using Expo framework).
2.  **Routing:** Expo Router for file-system based navigation.
3.  **Language:** TypeScript for type safety.
4.  **Core Functionality:** Primary application view is a WebView (`react-native-webview`).
5.  **Styling:** Standard React Native `StyleSheet` combined with centralized design tokens defined in `constants/theme.ts`.
6.  **Icons:** `lucide-react-native`.
7.  **Layout:** `react-native-safe-area-context` for handling device safe areas (notches, home indicators).
8.  **Utilities:** `expo-haptics` for user feedback and `@react-native-community/netinfo` for network monitoring.
9.  **Animations:** React Native's `Animated` API (e.g., in `LoadingProgressBar.tsx`).

## Library Usage Rules

To maintain consistency and performance, adhere to the following library usage guidelines:

| Feature | Recommended Library/Method | Notes |
| :--- | :--- | :--- |
| **Routing/Navigation** | `expo-router` | Use `Link` and `Stack` components/methods. |
| **UI Components** | Standard React Native components | Use `View`, `Text`, `TouchableOpacity`, `Image`, etc. |
| **Styling** | `StyleSheet.create` and `constants/theme.ts` | All colors, spacing, and typography must reference `THEME` constants. |
| **Icons** | `lucide-react-native` | Import icons directly from this package. |
| **Web Content** | `react-native-webview` | Used for the main application content (`app/index.tsx`). |
| **Safe Areas** | `SafeAreaView` from `react-native-safe-area-context` | Essential for proper layout on modern devices. |
| **Network Status** | `useNetworkStatus` hook | Do not import `@react-native-community/netinfo` directly into components; use the existing hook. |
| **Haptic Feedback** | `expo-haptics` | Use for subtle user interactions (e.g., button presses, navigation). |
| **Animations** | React Native `Animated` API | Use for simple, performant UI animations (like the progress bar). |
| **Splash Screen** | `expo-splash-screen` | Use `preventAutoHideAsync` and `hideAsync` as demonstrated in `app/index.tsx`. |