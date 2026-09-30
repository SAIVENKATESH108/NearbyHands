# Polish Plan — NearbyHands Hackathon Build

## Prioritized Moments (5 max)

### 1. Badge Unlock Animation
- **What**: Scale-up + checkmark + particle burst when badge is earned
- **Code location**: `src/app/profile.tsx` — badge card on mount; `src/app/claim.tsx` — on claim completion
- **Tech**: React Native `Animated` API (scale, opacity) + small SVG/checkmark overlay
- **Impact**: High — demonstrates "delight" judges expect; ~30 lines of animation code

### 2. Paywall Screen Polish
- **What**: Gradient background, refined typography, clearer entitlement states, subtle micro-interactions on buttons
- **Code location**: `src/app/paywall.tsx`
- **Tech**: StyleSheet improvements; LinearGradient if available; Animated opacity on subscribe button
- **Impact**: High — directly tied to RevenueCat Design Award; conversion-flow polish

### 3. Feed → Detail Shared Transition
- **What**: Listing image "pops" from feed card → detail screen; pushes other content smoothly
- **Code location**: `src/app/feed.tsx` (onPress to ListingDetail), `src/app/listing-detail.tsx`
- **Tech**: `useSharedValue` + `useAnimatedProps` (reanimated) OR basic Animated.timing with transform translateX/scale
- **Impact**: High — makes the app feel cohesive; 40-50 lines

### 4. Streak Increment Counter
- **What**: Animated number counter when helper_streak_count changes; pulse on the streak display
- **Code location**: `src/app/profile.tsx` — streak display; `src/app/claim.tsx` — on claim complete
- **Tech**: `Animated.timing` for number fade/scale; `LayoutAnimationIOS` for system anim
- **Impact**: Medium — reinforces gamification; ~20 lines

### 5. Accessibility Audit & Fixes
- **What**: System-font-size-responsive typography; min 44px padding on interactive elements; contrast ratio ≥ 4.5:1
- **Code location**: All screens — button padding, Text font sizes, View backgrounds
- **Tech**: `fontSize: { base: 16, family: 'system' }`; `minPadding: 24`; contrast checking
- **Impact**: Critical — non-negotiable constraint; fixes may affect visual polish but must be done

## What I'm NOT Polishing (yet)
- Full onboarding walkthrough animations (keep placeholder)
- Tab bar icon animations (keep default)
- Splash screen customization (out of scope)
- Dark mode (out of scope for hackathon deadline)

## Accessibility Checklist (per context brief)
- [ ] Minimum tap target: 44x44pt on all buttons/touchables
- [ ] Dynamic Type support: use `system` font family; `allowFontScaling` on Text
- [ ] Color contrast: verify against #0A0A23 background, #fff text, #888 inactive text
- [ ] Meaningful label text on all interactive elements (screen readers)
- [ ] Focus order logical (Tab key / VoiceOver navigation)

## Verification Step
Confirm this 5-moment plan aligns with your vision before I begin code changes.