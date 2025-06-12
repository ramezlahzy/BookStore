# 📚 BookStore - React Native App

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square)]()
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

</div>

A modern, feature-rich React Native bookstore application with Firebase integration. Browse books, manage your library, make purchases, and enjoy a seamless reading experience across iOS and Android platforms.

## ✨ Features

### 📖 Core Features
- **Book Catalog** - Browse extensive collection with search and filters
- **User Authentication** - Secure login/signup with Firebase Auth
- **Shopping Cart** - Add books, manage quantities, and checkout
- **User Profiles** - Personalized accounts with reading history
- **Wishlist** - Save books for later purchase
- **Reviews & Ratings** - Community-driven book recommendations

### 📱 Mobile Experience
- **Cross-platform** - iOS and Android support
- **Offline Mode** - Read downloaded books without internet
- **Push Notifications** - New releases and personalized recommendations
- **Dark/Light Theme** - Customizable reading experience
- **Responsive Design** - Optimized for all screen sizes

### 🔧 Technical Features
- **Real-time Updates** - Live inventory and pricing
- **Secure Payments** - Integrated payment processing
- **Cloud Sync** - Sync library across devices
- **Performance Optimized** - Fast loading and smooth animations

## 🛠️ Tech Stack

- **Framework**: React Native with TypeScript
- **State Management**: Redux Toolkit
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Navigation**: React Navigation 6
- **Testing**: Jest, React Native Testing Library
- **Build Tools**: Metro bundler, Gradle, Xcode
- **CI/CD**: GitHub Actions

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- React Native development environment
- iOS Simulator (macOS) or Android Emulator
- Firebase project setup

### Installation

```bash
# Clone the repository
git clone https://github.com/ramezlahzy/BookStore.git
cd BookStore

# Install dependencies
npm install

# Install iOS dependencies (macOS only)
cd ios && pod install && cd ..

# Start Metro bundler
npm start
```

### Running the App

#### For Android
```bash
npm run android
```

#### For iOS
```bash
npm run ios
```

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication, Firestore, and Storage
3. Download configuration files:
   - `google-services.json` for Android → `android/app/`
   - `GoogleService-Info.plist` for iOS → `ios/BookStore/`
4. Update Firebase configuration in `src/config/firebase.ts`

## 🏗️ Project Structure

```
BookStore/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── common/       # Generic components
│   │   └── book/         # Book-specific components
│   ├── screens/          # Screen components
│   │   ├── auth/         # Authentication screens
│   │   ├── book/         # Book-related screens
│   │   └── profile/      # User profile screens
│   ├── navigation/       # Navigation configuration
│   ├── redux/           # State management
│   │   ├── slices/      # Redux slices
│   │   └── store.ts     # Store configuration
│   ├── services/        # API and Firebase services
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript type definitions
│   └── assets/          # Images, fonts, etc.
├── android/             # Android-specific code
├── ios/                 # iOS-specific code
├── functions/           # Firebase Cloud Functions
└── __tests__/           # Test files
```

## 📱 Screenshots

*Add screenshots of your app here*

## 🔧 Available Scripts

```bash
npm start              # Start Metro bundler
npm run android        # Run on Android
npm run ios           # Run on iOS
npm test              # Run tests
npm run lint          # Run ESLint
npm run clean         # Clean build artifacts
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Android
```bash
# Generate release APK
cd android
./gradlew assembleRelease

# Generate AAB for Play Store
./gradlew bundleRelease
```

### iOS
1. Open `ios/BookStore.xcworkspace` in Xcode
2. Select target device/simulator
3. Product → Archive for App Store distribution

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

## 📈 Performance Optimization

- **Image Optimization** - Compressed images and lazy loading
- **Bundle Splitting** - Code splitting for faster startup
- **Caching** - Smart caching strategies for API responses
- **Memory Management** - Efficient list rendering with FlashList

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React Native community for excellent documentation
- Firebase team for powerful backend services
- Open source contributors and maintainers

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/ramezlahzy">Ramez Nashaat</a></p>
</div>
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
