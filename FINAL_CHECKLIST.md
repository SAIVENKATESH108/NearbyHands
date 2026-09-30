# NearbyHands — Final Pre-Submission Checklist

## 🔴 CRITICAL: Must Complete Before App Store Submission

### 1. Provide Apple Developer Values (REQUIRED - I cannot guess these)
- [ ] **Bundle ID**: `com.<yourinitials>.nearbyhands` 
  - e.g., `com.venkat.nearbyhands` or `com.sai.nearbyhands`
  - Must be registered in Apple Developer Portal
  - Also set in Xcode project if ejecting to native
- [ ] **Team ID**: `T<XXXXX>XXXXX` 
  - Your Apple Developer Team ID
  - Needed for signing, provisioning profiles
- [ ] **Privacy Policy URL**: Hosted URL with full UGC disclosures
  - Must cover: data collected, how used, user rights, children's privacy
  - URL must be accessible (HTTPS)
- [ ] **Copyright holder**: `© 2026 <Your Name>. All rights reserved.`
  - Update from default "© 2026 Expo. All rights reserved."

### 2. App Store Connect Metadata (fill in App Store Connect portal)
- [ ] **App Description** (full): 2-3 paragraphs emphasizing this is a
  "utility marketplace, NOT a game" per judging criteria
- [ ] **Keywords** (50 chars max): `community, marketplace, neighborhood, tool-lending, food-sharing`
- [ ] **Subtitle**: "Share tools, food, and skills with your neighborhood" (30 chars max)
- [ ] **In-App Purchase**: `community_champion`
  - [ ] Product ID matches RevenueCat entitlement ID
  - [ ] Price tier selected (Tier 3: $9.99/mo OR Tier 5: $29.99/yr)
  - [ ] Free trial / introductory price configured OR set to none
  - [ ] Localization added for all target countries
- [ ] **Review Notes** (critical - read by human):
  > "This is a community mutual-aid marketplace, NOT a game. 
  > Subscription (community_champion) unlocks: unlimited active listings + 
  > priority visibility boost for 24 hours. 
  > No levels, quests, avatars, or XP — only helper streaks (count-based) and 
  > badges at 5-listing milestones. 
  > User-generated content is moderated per community guidelines. 
  > No illegal content, weapons, or regulated substances. 
  > App uses approximate neighborhood matching, not real-time GPS tracking. 
  > Review needed: demo account credentials below."
- [ ] **App Review Demo Account** (CRITICAL - without this, app will be rejected):
  - [ ] Username: <<tester or similar>>
  - [ ] Password: <<testpassword>>
  - [ ] Neighborhood: Downtown / Uptown / Midtown
  - [ ] Note: "Hackathon build — demo mode with sample listings, no real users"
  - [ ] **This is mandatory for apps with subscriptions & UGC**

### 3. App Review Assets
- [ ] **Minimum 2 iPhone screenshots** (required):
  - [ ] Onboarding/neighborhood selection screen
  - [ ] Feed screen with listings
  - [ ] Profile screen with streak & badges (desirable)
  - [ ] Paywall/subscription screen (desirable)
  - Resolution: iPhone 15 Pro Max (1290×2796) recommended
  - No status bar override beyond default
  - No framework UI chrome (no React Native debug menu)
  - No placeholder text visible (e.g., "(example)" should not appear in any visible copy)
- [ ] **App Preview video** (optional but recommended, max 30 sec):
  - Screen recording showing: onboarding → feed browsing → post listing → profile
  - No UI animations revealing code structure
  - mp4 or mov format

### 4. Privacy Policy (MANDATORY for UGC apps)
- [ ] **Privacy policy page** published at your URL (e.g., `https://yourdomain.com/privacy`)
- [ ] **Must include** (Apple requirements):
  - [ ] Types of data collected: location (neighborhood), user-generated content (listings/claims), account info
  - [ ] How data is used: operate marketplace, show relevant listings, improve app, communications
  - [ ] Data sharing: not shared with third parties except as required by law
  - [ ] User rights: how to request data deletion, contact support
  - [ ] Children's privacy: COPPA compliance statement (app is for ages 17+ or verify age)
  - [ ] Third-party SDKs: Supabase (data), RevenueCat (subscriptions), OneSignal (if active), Layers (if active)
  - [ ] Contact information: email for questions/concerns
- [ ] **Privacy Policy URL** entered in App Store Connect

### 4. EAS Build & Binary
- [ ] **Run EAS production build**: 
  ```bash
  eas build --platform ios --profile production
  ```
  or
  ```bash
  eas build -p ios --profile production
  ```
- [ ] **Upload binary** to App Store Connect after build completes
- [ ] **Wait for processing** (15-30 min after build finishes)
- [ ] **Submit for Review** (not "Release to App Store" initially)
  - Choose "Submit for Review" first time to get reviewer feedback before public release

### 5. App-Specific Review Items
- [ ] **Review Notes clearly state**: "NOT a game" — emphasize utility marketplace
- [ ] **Subscription purpose explicit**: "Unlocks unlimited listings + 24hr visibility boost"
- [ ] **No game mechanics**: "No levels, quests, avatars, or XP beyond streaks/badges"
- [ ] **UGC moderation noted**: "Users post tools/food/skills, moderated by guidelines"
- [ ] **Location usage**: "Uses approximate neighborhood matching, not real-time GPS"
- [ ] **Age rating declared**: Likely 17+ given UGC+location, or 9-11 if content is mild
- [ ] **Demo account works**: Test the Review Demo Account credentials end-to-end
  - Log in as demo user
  - Browse feed
  - Attempt subscription restore (if applicable)
  - View profile/streak

### 6. Open Technical Debt (may affect review but not blocking submission)
- [ ] **`#888` contrast fix** in tab bar — fix inactive tint color from `#888` to `#555555` 
  for 4.5:1+ AA compliance (aesthetic polish, not review-blocking)
- [ ] **RevenueCat Ads API** — `requestVisibilityBoost()` TODO needs doc verification
  (functionality, not review-blocking if using placeholder)
- [ ] **Supabase `referrals` table** — schema creation needed for referral flow
  (future feature, not blocking submission)
- [ ] **App Icon & Splash Screen resolutions** — ensure assets are 1024×1024 px 
  (Apple may reject if too small/low-res; currently placeholder assets in assets/)

### 6. Post-Submission
- [ ] **Monitor email** from App Review for messages/feedback
- [ ] **If rejected**: Update build via `eas build --platform ios --profile production`, 
  resubmit with fixes
- [ ] **If approved**: App goes live on chosen release date
- [ ] **Track** RevenueCat subscription conversions, App Store Connect analytics
- [ ] **Respond to reviewer questions** promptly if messages received

---

## 📝 Quick Reference: Values I Need From You

| Value | Format | Example | Where It Goes |
|-------|--------|---------|---------------|
| Bundle ID | `com.yourinitials.nearbyhands` | `com.venkat.nearbyhands` | Apple Developer, App Store Connect, eas.json |
| Team ID | `TXXXXX` | `T9ABCD1234` | Apple Developer, Xcode signing, App Store Connect |
| Privacy Policy URL | `https://...` | `https://nearbyhands.com/privacy` | App Store Connect -> App Information |
| Copyright holder | `Your Name` | `Venkat` | App Store Connect -> App Information |
| Subscription price tier | Tier 3 ($9.99/mo) or Tier 5 ($29.99/yr) | Tier 3 | App Store Connect -> In-App Purchases |
| Review Demo Account username | any | `hacktester` | App Store Connect -> Review Information |
| Review Demo Account password | any | `hackpass123` | App Store Connect -> Review Information |
| Neighborhood for demo account | Downtown / Uptown / Midtown | Downtown | App Review Notes (for tester) |
| Privacy policy content | full page on your site | — | Linked from App Store Connect, also referenced in-app |

## ✅ RUN ORDER

1. Provide the 9 values above
2. Resize app icon/splash assets if needed
3. Run: `eas build --platform ios --profile production`
4. Upload binary to App Store Connect
5. Fill all metadata sections (description, IAP, review notes, demo account)
6. Submit for Review
7. Monitor for reviewer feedback email

---