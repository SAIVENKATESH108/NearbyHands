// RevenueCat SDK configuration
// TODO: Replace placeholder with actual API key provided by the user
export const REVENUECAT_API_KEY_PLACEHOLDER = 'YOUR_REVENUECAT_PUBLIC_KEY_HERE';

// Entitlement and product IDs — also placeholders
export const ENTITLEMENT_ID_PLACEHOLDER = 'community_champion';
export const UNLISTINGS_PRODUCT_ID = 'unlimited_listings';
export const BOOST_PRODUCT_ID = 'visibility_boost';

import { Purchases, configure, CurrentUserInfo, Entitlement, OwnershipStatus } from 'react-native-purchases';

// Initialize RevenueCat with your API key
export const initializePurchases = () => {
  configure({
    apiKey: REVENUECAT_API_KEY_PLACEHOLDER,
    // Android and iOS can share the same key if using the same project
    appUserId: undefined, // Let anonymous / auth-managed flow work
  });
};

// Get the current user's entitlement status
export const checkEntitlements = async (): Promise<{
  hasCommunityChampion: boolean;
  hasUnlimitedListings: boolean;
}> => {
  try {
    const user = await Purchases.getCurrentUser();
    const entitlements = await Purchases.getEntitlements();

    // Check if the community_champion entitlement is active
    const championStatus: OwnershipStatus = entitlements[ENTITLEMENT_ID_PLACEHOLDER]?.isActive
      ? 'active'
      : 'inactive';

    return {
      hasCommunityChampion: championStatus === 'active',
      hasUnlimitedListings: championStatus === 'active', // gated by same entitlement
    };
  } catch (error) {
    console.error('Error checking entitlements:', error);
    return { hasCommunityChampion: false, hasUnlimitedListings: false };
  }
};

// TODO: Verify RevenueCat Ads API method exists —
// requestAd/productID may not be the correct API.
// See: https://docs.revenuecat.com/docs/ads
export const requestVisibilityBoost = async (): Promise<boolean> => {
  // Placeholder: RevenueCat Ads integration needs verification
  // If the method exists, it would likely look like:
  // const result = await Purchases.requestAd(productId: BOOST_PRODUCT_ID);
  // return result.success;
  
  // For now, return false and show a TODO in UI
  console.log('Visibility boost requested — Ads API needs verification');
  return false;
};

export default { initializePurchases, checkEntitlements, requestVisibilityBoost };