# NearbyHands - Implementation Plan

## Phase 1: Project Setup & Core Config
- [ ] Install Supabase, RevenueCat, OneSignal, Layers SDK packages
- [ ] Configure app.json with Expo credentials
- [ ] Set up Expo Router navigation structure
- [ ] Create demo mode toggle for seed data

## Phase 2: Data Models & Supabase Integration
- [ ] Set up Supabase tables: users, listings, claims, neighborhoods
- [ ] Create Supabase client and auth context
- [ ] Implement placeholder/seed data layer

## Phase 3: Screen Implementations
1. Onboarding/Neighborhood Selection
2. Feed with filters
3. Post Listing form
4. Listing Detail + Claim flow
5. Profile screen
6. Paywall (RevenueCat)
7. Settings

## Phase 4: Polish & Accessibility
- [ ] Tap target 44x44pt
- [ ] Dynamic Type support
- [ ] Color contrast checks
- [ ] Test with demo mode

## Phase 5: Testing & Verification
- [ ] Verify all screens work with placeholder data
- [ ] Demo mode seeding
- [ ] iOS build compatibility