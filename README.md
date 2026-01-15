# Ochena Mobile

A premium, native-feeling Expo mobile wrapper application for the Ochena website (https://ochena-web.vercel.app).

## Features

### Core Functionality
- **WebView Integration**: Full-featured WebView with custom user agent for mobile app identification
- **Smart Back Navigation**: Android hardware back button navigates through WebView history
- **Pull-to-Refresh**: Native pull-to-refresh gesture for reloading content
- **Loading Progress Bar**: Sleek progress indicator at the top during page loads
- **Haptic Feedback**: Subtle vibration feedback on navigation and refresh actions

### Premium UI/UX
- **Ochena Brand Colors**:
  - Brand Ocean: #4b4be2
  - Dreamy Teal: #4FD1C5
  - Creamy White: #FDFCF0
  - Charcoal: #171717
- **Safe Area Support**: Respects device notches and home indicators
- **Custom Splash Screen**: Ochena-branded loading experience
- **Offline Detection**: Beautiful offline screen with retry functionality

### Technical Implementation
- React Native WebView with full JavaScript and DOM storage support
- Network status monitoring with auto-detection
- Responsive status bar styling
- Smooth animations using Animated API
- Cross-platform support (iOS, Android, Web)

## Project Structure

```
├── app/
│   ├── _layout.tsx          # Root layout with framework initialization
│   ├── index.tsx             # Main WebView screen
│   └── +not-found.tsx        # 404 screen
├── components/
│   ├── LoadingProgressBar.tsx # Animated progress indicator
│   └── OfflineScreen.tsx      # Offline state UI
├── hooks/
│   ├── useFrameworkReady.ts   # Framework initialization hook
│   ├── useNetworkStatus.ts    # Network monitoring hook
│   └── useWebViewBackHandler.ts # Android back button handler
├── constants/
│   └── theme.ts               # Brand colors and design tokens
└── app.json                   # Expo configuration
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (optional)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for web:
```bash
npm run build:web
```

## Configuration

### App Configuration (app.json)
- **App Name**: Ochena Mobile
- **Bundle ID (iOS)**: com.ochena.mobile
- **Package Name (Android)**: com.ochena.mobile
- **Orientation**: Portrait only
- **Tablets**: iOS tablets disabled

### Permissions
- Camera access for photo uploads
- Photo library access for image uploads
- Internet access
- Network state monitoring

## Key Components

### WebView Screen (app/index.tsx)
The main screen implementing:
- Custom user agent with "OchenaMobile" identifier
- Loading state management
- Network connectivity checks
- Pull-to-refresh functionality
- Safe area handling

### Loading Progress Bar (components/LoadingProgressBar.tsx)
Animated progress bar that:
- Shows loading progress at the top
- Fades in/out smoothly
- Uses brand ocean color (#4b4be2)

### Offline Screen (components/OfflineScreen.tsx)
Displays when no internet connection is detected:
- Ochena logo
- WiFi off icon
- Friendly error message
- Retry button with haptic feedback

## Development Notes

### Custom User Agent
The WebView appends "OchenaMobile/1.0" to the user agent, allowing the website to detect mobile app traffic.

### Back Button Behavior
On Android, the hardware back button:
- Navigates back through WebView history when available
- Exits the app only when on the initial page

### Haptic Feedback
Light haptic feedback is triggered on:
- Page navigation start
- Pull-to-refresh gesture
- Retry button press

### Network Detection
Uses @react-native-community/netinfo to:
- Monitor connection status in real-time
- Show offline screen when disconnected
- Auto-retry when connection is restored

## Building for Production

### iOS
1. Export your project: `expo prebuild`
2. Open in Xcode and configure signing
3. Build and archive for App Store

### Android
1. Export your project: `expo prebuild`
2. Open in Android Studio
3. Generate signed APK/AAB

### Web
```bash
npm run build:web
```
Output will be in the `dist` folder.

## Deployment

The web version can be deployed to:
- Vercel
- Netlify
- AWS Amplify
- Any static hosting service

For native apps, use:
- EAS Build (recommended)
- Local builds with Xcode/Android Studio

## Future Enhancements

Potential features to add:
- Push notifications
- Deep linking support
- Share functionality
- Download manager
- Biometric authentication
- App rating prompts

## License

Proprietary - Ochena Mobile

## Support

For issues or questions, contact the Ochena development team.
