# NearbyHands — App Store Connect Pre-Submission Checklist

## ⚠️ MANUAL STEPS REQUIRED (cannot be automated from Replit)

These must be completed in App Store Connect after the EAS build is uploaded:

### 1. App Store Connect Setup
- [ ] Create new app record in App Store Connect
  - [ ] **Full Name**: "NearbyHands"
  - [ ] **Primary Language**: English
  - [ ] **SKU**: `nearbyhands` (or your choice)
  - [ ] **Bundle ID**: <<REQUIRED: Provide your Apple Developer bundle ID (e.g., com.yourname.nearbyhands)>>
  - [ ] **Team ID**: <<REQUIRED: Your Apple Developer Team ID>>
  - [ ] **Price Tier**: Free (or determine if any paid tier needed)
- [ ] Upload EAS-built iOS binary via Application Loader or App Store Connect portal
- [ ] Wait for processing (typically 15-30 min after EAS build completes)

### 2. App Information (fill in App Store Connect -> App -> App Information)
- [ ] **Keywords**: <50 chars, comma-separated, relevant to marketplace/local community/
  tool-lending/food-sharing>
- [ ] **Subtitle**: "Share tools, food, and skills with your neighborhood" (max 30 chars)
- [ ] **Description**: 
  - **What's New** (first release): "Community marketplace for tool lending, surplus food sharing,
    and skill swapping within your local area."
  - **Full Description**: <<NEEDS YOUR COPY: Write 2-3 paragraph description of the app's value
    proposition, emphasizing it's a utility marketplace NOT a game>>
- [ ] **Support URL**: <<YOUR WEBSITE OR privacy policy URL>>
-  **Marketing URL**: <<YOUR WEBSITE OR landing page URL>>
- [ ] **Copyright**: "© 2026 Your Company/Name. All rights reserved." (update with your name)

### 3. In-App Purchase (RevenueCat "Community Champion" subscription)
- [ ] **Add In-App Purchase**:
  - **Product ID**: `community_champion` (must match RevenueCat entitlement ID)
  - **Product Type**: Auto-Renewing Subscription
  - **Billing Mode**: Subscription
  - **Price Tier**: <<SELECT: e.g., Tier 3 ($9.99/mo or Tier 5 ($29.99/yr)>>
  - **Localization**: Add pricing for all supported countries
  - **Subscription Period**: 
    - [ ] Introductory Offer: <<SELECT or none>>
    - [ ] Free Trial: <<SELECT duration or none>>
    - [ ] Introductory Price: <<SELECT or none>>
  - **Sell Price**: <<SET based on your chosen tier>>
  - **Free Trial & Introductory Price Price Point**: <<SELECT>>
- [ ] **In-App Purchase Testing**:
  - [ ] Create test user in App Store Connect
  - [ ] Note test user credentials for QA
- [ ] **Required Review Note**: <<SED explanatory note for review:
    "Community Champion subscription unlocks unlimited listings and priority visibility
    boost for 24 hours. No adult content. User-generated content moderated. No
    gambling, quests, avatars, or game mechanics beyond helper streaks and badges.">
- [ ] **Declare associated functionalities**:
  - [ ] Subscriptions (required, checked)
  - [ ] User Generated Content (may need checked depending on review)

### 4. Privacy Policy (CRITICAL for UGC apps)
- [ ] **Create privacy policy page** at a hosted URL (e.g., `https://yourdomain.com/privacy`)
- [ ] **Must cover** (per Apple requirements for apps with user-generated content):
  - [ ] Types of data collected (personal data, location, content users post)
  - [ ] How data is used (to operate marketplace, show relevant listings, improve app)
  - [ ] Data sharing (not shared with third parties except as required by law)
  - [ ] User rights (delete data, contact support)
  - [ ] Children's privacy (COPPA compliance — app is 17+ or verify age)
  - [ ] Contact information
- [ ] **Privacy Policy URL** in App Store Connect: <<YOUR PRIVACY POLICY URL>>
- [ ] **In-app privacy link**: Consider adding "Privacy Policy" link in Settings screen
- [ ] **Sample privacy policy topics** for reference:
  - Location data usage (neighborhood matching)
  - User content (listings, claims, profiles)
  - Contact communications (notifications, support)
  - Third-party SDKs (Supabase, RevenueCat, OneSignal if active, Layers)

### 5. App Store Review Guidelines Specific to This App
- [ ] **No game mechanics violation**: Explicitly note in Review Notes that this is a
  utility marketplace, NOT a game. No levels, quests, avatars, or XP. Only gamification
  is: helper streaks (count-based), badges (5-listening milestones), and a simple
  leaderboard (ranking by completed claims — already confirmed no real users in demo mode).
- [ ] **In-app purchase purpose clear**: Subscription unlocks "unlimited listings" and
  "visibility boost for 24 hours" — make sure Review Notes explain this clearly.
- [ ] **User-generated content**: App allows neighbors to post/list/share. Declare UGC.
  - [ ] Review Notes should mention: "Users can post tools, food, and skills. Content
    is moderated by community guidelines. No illegal content, no weapons, no regulated
    substances."
- [ ] **Age rating**: Select appropriate rating. Given UGC and location, likely **17+** 
  or **9-11** depending on content. Apple may auto-assign based on keywords.
- [ ] **Location permission**: App uses neighborhood/geo-based matching. Review Notes
  should explain: "Uses approximate location to match users within defined neighborhoods.
  No real-time GPS tracking."
- [ ] **Subscription clarity**: Review Notes must clearly state what the subscription
  unlocks and does NOT unlock. Be very explicit:
  - Unlocks: Unlimited active listings, priority visibility boost (24hr)
  - Does NOT unlock: No game mechanics, no levels, no avatars, no quests

### 6. App Review Assets (screenshots)
- [ ] **iPhone Screenshots** (required, at least 2):
  - [ ] iPhone 15 Pro Max (or latest): 1290 x 2796
  - [ ] iPhone 15 (or latest): 1179 x 2532
  - Showcasing: Onboarding, Feed, Post Listing, Profile with streak/badges
  - **Optional but recommended**: Landscape shots, Detail screen, Paywall
- [ ] **iPad Screenshots** (optional but recommended if supporting tablet):
  - [ ] iPad Pro 12.9-inch (7th gen): 2732 x 2048
- [ ] **Screenshot Localization**: Add English localization at minimum
- [ ] **Screen capture guidelines**: No device chrome beyond status bar, no framework
  UI chrome (no React Native debug menu, no console logs), no placeholder text like
  "(example)" in visible copy

### 7. App Preview (optional but recommended)
- [ ] **App Preview video** (max 30 sec, mp4, mov):
  - Show: Onboarding flow, Feed browsing, Posting a listing, Profile with streak
  - No UI animations that reveal code, no placeholder text visible
  - Can use screen recording of the Expo Go app or a development build

### 8. Contact Information
- [ ] **Developer Contact Info**: Your email address (visible to reviewers)
- [ ] **App Review Contact**: Email for reviewer questions (same as above or dedicated)
- [ ] **App Review Demo Account** (REQUIRED if subscription or UGC):
  - [ ] **Username**: <<testaccount or similar>>
  - [ ] **Password**: <<testpassword>>
  - [ ] **Neighborhood**: <<select one: Downtown, Uptown, or Midtown>>
  - [ ] **Login notes**: "Test user for hackathon build — no real data, demo mode only"
  - [ ] This is CRITICAL for apps with subscriptions/UGC — without it, app will be rejected

### 9. Release Management
- [ ] **Release Type**: Choose one:
  - [ ] Release to App Store (for manual review then release)
  - [ ] Submit for Review (recommended for first release)
  - [ ] Release to TestFlight (if testing with external testers)
- [ ] **Version Release Dates**: Set future date if not immediate
- [ ] **What's New in this Version**: Describe changes from 1.0.0 (or current version)

### 10. Post-Submission Checklist
- [ ] **After submission**: Monitor email from App Review for messages
- [ ] **If rejected**: Review feedback, update build via EAS, resubmit
- [ ] **If approved**: App goes live on App Store on chosen release date
- [ ] **Monitor analytics**: Track downloads, crashes via App Store Connect Analytics
- [ ] **Track RevenueCat metrics**: Subscription conversions, restores

---

## 📋 EAS Build Command Reference

After configuring, run these EAS commands:

```bash
# 1. Initialize EAS (first time only)
eas init  # Follow prompts: "Manage workflows manually" is fine

# 2. Build iOS development build (test on device)
eas build --platform ios --profile development

# 3. Build iOS preview build (simulates App Store, no testflight)
eas build --platform ios --profile preview

# 4. Build iOS production build (submit to App Store)
eas build --platform ios --profile production

# 5. Check build status
eas build:status

# 6. Submit to App Store Connect after build completes
eas submit --platform ios
```

## ⚠️ Values You Must Provide (cannot be auto-generated)

| Value | Where It's Used | Example |
|-------|----------------|---------|
| **Bundle ID** (`com.yourname.nearbyhands`) | App Store Connect, eas.json if configured | `com.venkat.nearbyhands` |
| **Team ID** (`TXXXXXXXXXX`) | App Store Connect, Apple Developer portal | `ABCD1234EFGH` |
| **Privacy Policy URL** | App Store Connect -> App Information | `https://yourdomain.com/privacy` |
| **Subscription Price Tier** | App Store Connect -> In-App Purchases | Tier 3 ($9.99/mo) or Tier 5 ($29.99/yr) |
| **App Review Demo Account credentials** | App Review Notes in App Store Connect | `username: tester, password: test123` |
| **Copyright holder name** | App Store Connect -> App Information | `© 2026 Venkat. All rights reserved.` |
| **App Keywords** (50 chars max) | App Store Connect -> App Information | `community, marketplace, neighborhood, tool-lending, food-sharing` |
| **Support URL** | App Store Connect -> App Information | `https://yourdomain.com/support` |
| **Marketing URL** | App Store Connect -> App Information | `https://yourdomain.com/nearbyhands` |

## 🎯 Critical Path Summary

1. **Generate app icons/splash screens** at proper resolutions (already have placeholder assets, may need resize)
2. **Set bundle ID & Team ID** in Apple Developer portal + App Store Connect
3. **Create privacy policy URL** with required UGC disclosures
4. **Configure In-App Purchase** in App Store Connect (community_champion ID, price tier)
5. **Fill App Review Demo Account** — this is often the make-or-break for rejection
6. **Write Review Notes** explaining: utility marketplace NOT game, subscription details, UGC moderation
7. **Upload EAS-built binary** to App Store Connect
8. **Submit for Review** and monitor feedback email

## ⚠️ Known Issues & Open Questions

1. **App Icon & Splash Screen Resolutions**: Current assets are placeholder. EAS builds require:
   - iPhone App Icon: 1024×1024 px (also used for App Store)
   - iPad App Icon: 1024×1024 px with rounded corners preview
   - iPhone Splash: device-specific sizes, or use Launch Screen Storyboard
   - iPad Splash: corresponding iPad sizes
   - **Action**: Resize `assets/icon.png` and `assets/splash-icon.png` to proper resolutions OR use Launch Screen XIB

2. **InfoPlist keys**: Some iOS permissions (camera, microphone) are listed but may not be used yet. Either remove or add actual usage descriptions.

3. **Advertising ID**: If Apple requires ATT (App Tracking Transparency) setup for any SDK, that's not yet implemented. Note: OneSignal may require this.

4. **Review Notes length**: Keep under 4000 characters. Be concise but thorough.

5. **Age rating**: Will Apple assign 9-11 or 17+? Depends on keywords "location," "user-generated content," "subscription." Be prepared to update if rejected.

---

## ✅ NEXT IMMEDIATE STEPS

1. **Resize app icon and splash screen assets** to proper resolutions
2. **Provide these values** so I can finalize config:
   - Bundle ID: `com.<yourinitials>.nearbyhands`
   - Team ID: `T<yourteamid>`
   - Privacy Policy URL
   - Desired subscription price tier
3. **Create privacy policy page** at your URL with UGC disclosures
4. **Run**: `eas build --platform ios --profile production`
5. **Upload to App Store Connect** and fill all sections above
6. **Add App Review Demo Account** credentials
7. **Submit for Review** and monitor feedback