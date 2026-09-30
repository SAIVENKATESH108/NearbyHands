# NearbyHands MVP Scaffold - Complete

## Plan (steps executed)

1. ✅ Scaffolded Expo TypeScript project with `npx create-expo-app@latest`
2. ✅ Installed core SDKs: @supabase/supabase-js, react-native-purchases (RevenueCat)
3. ✅ Created navigation structure: React Navigation bottom tabs (Feed/Post/Profile) + stack screens (Listing Detail, Paywall, Settings)
4. ✅ Created all 7 MVP screen placeholders as minimal TypeScript components
5. ✅ Set up AppNavigator connecting all screens via NavigationContainer/StackNavigator/BottomTabNavigator
6. ✅ Onboarding flow: neighborhood selection → navigation to main tab navigator

## Code Changes - File Structure

```
src/app/
├── index.tsx          Onboarding: neighborhood selection (first-time user)
├── feed.tsx           Feed: browse listings with sample seed data
├── post.tsx           Post: create tool/food/skill listing
├── profile.tsx        Profile: streak, badges, my listings, my claims
├── listing-detail.tsx Listing Detail: claim/request flow (stack screen)
├── paywall.tsx        Paywall: RevenueCat "Community Champion" sub (stack screen)
├── settings.tsx       Settings: notifications toggle, account (stack screen)
└── navigation.tsx     Navigation: StackNavigator + BottomTabNavigator wiring
```

### Navigation Architecture (navigation.tsx)

- **StackNavigator** with routes: `App` → `Tabs` (bottom tabs), `ListingDetail`, `Paywall`, `Settings`
- **BottomTabNavigator** with 3 tabs: Feed, Post, Profile (44pt+ tap targets, `#0A0A23` bar)
- From Feed: tapping a listing pushes `ListingDetail` via `navigation.push('ListingDetail')`
- From Profile: buttons push `Paywall` and `Settings`
- Onboarding: `navigation.replace('App')` switches from neighborhood selection to main app

### Each Screen (minimal placeholder)

All 7 screens return centered Text + StyleSheet layout with placeholder content. No real data fetching. Screens work with seed data only.

## Verify Before Continuing

**Assumptions:**
- Expo SDK 57, React Native 0.86.3, TypeScript 6.x compatible
- iOS primary target — app.json configured for iOS
- React Navigation 6.x APIs used correctly
- Demo mode toggle will seed feed with realistic sample listings (no real users)

**Needs from you (API keys/config):**
- **Supabase**: project URL + anon key for data fetching
- **RevenueCat**: public key for Paywall/Community Champion subscription
- **OneSignal**: App ID for push/engagement
- **Layers SDK**: config for growth analytics

**Screens needing accessibility review:**
- Paywall: color contrast between text and background needs verification
- Settings: Switch component accessibility labels may need tweaking
- All tab bar items: ensure meaningful labels and 44x44pt hit areas

**To run:**
```bash
npx expo start           # dev server
# iOS: npx expo start --ios (Mac required) or use Expo Go
```