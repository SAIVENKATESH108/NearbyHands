import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const INITIAL_LISTINGS = [
  {
    id: '1',
    title: 'DeWalt 20V Cordless Drill & Bit Set',
    type: 'tool',
    categoryEmoji: '🛠️',
    owner: 'Marcus T.',
    neighborhood: 'Downtown',
    description: 'Includes 2 batteries and full drill bit case. Great for furniture assembly or hanging shelves.',
    timeAgo: '15m ago',
    isClaimed: false,
  },
  {
    id: '2',
    title: 'Freshly Baked Rosemary Sourdough',
    type: 'food',
    categoryEmoji: '🍞',
    owner: 'Elena R.',
    neighborhood: 'Downtown',
    description: 'Baked this morning! Half loaf available to a good neighbor. Organic flour with wild starter.',
    timeAgo: '42m ago',
    isClaimed: false,
  },
  {
    id: '3',
    title: 'Spanish Conversation Practice (30 min)',
    type: 'skill',
    categoryEmoji: '🗣️',
    owner: 'Carlos M.',
    neighborhood: 'Uptown',
    description: 'Native speaker offering casual practice sessions over coffee or Zoom. All levels welcome.',
    timeAgo: '2h ago',
    isClaimed: false,
  },
  {
    id: '4',
    title: 'Extendable Aluminum 16ft Ladder',
    type: 'tool',
    categoryEmoji: '🪜',
    owner: 'David K.',
    neighborhood: 'Midtown',
    description: 'Heavy duty Werner ladder. Clean and sturdy, ready for gutter cleaning or exterior painting.',
    timeAgo: '3h ago',
    isClaimed: false,
  },
  {
    id: '5',
    title: 'Bicycle Tune-Up & Tire Patching',
    type: 'skill',
    categoryEmoji: '🚲',
    owner: 'Aisha P.',
    neighborhood: 'Downtown',
    description: 'Happy to help index gears, true wheels, and fix flats this weekend. Bring your bike over!',
    timeAgo: '5h ago',
    isClaimed: true,
  },
];

const NEIGHBORHOODS = ['Downtown', 'Midtown', 'Uptown', 'Westside', 'East Village'];

export default function App() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Downtown');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true);
  const [activeTab, setActiveTab] = useState('feed');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isChampion, setIsChampion] = useState(false);
  const [streakDays, setStreakDays] = useState(7);
  const [claimedIds, setClaimedIds] = useState(['5']);

  // New post form state
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('tool');
  const [newDescription, setNewDescription] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);

  // Claim handler
  const handleClaim = (listing) => {
    setListings((prev) =>
      prev.map((item) => (item.id === listing.id ? { ...item, isClaimed: true } : item))
    );
    setClaimedIds((prev) => (prev.includes(listing.id) ? prev : [...prev, listing.id]));
    setSelectedListing((prev) => (prev && prev.id === listing.id ? { ...prev, isClaimed: true } : prev));
    setStreakDays((prev) => prev + 1);
  };

  // Add post handler
  const handleCreatePost = () => {
    if (!newTitle.trim() || !newDescription.trim()) return;

    const emojiMap = { tool: '🛠️', food: '🍞', skill: '💡' };
    const newListing = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      type: newType,
      categoryEmoji: emojiMap[newType] || '📦',
      owner: 'You',
      neighborhood: selectedNeighborhood,
      description: newDescription.trim(),
      timeAgo: 'Just now',
      isClaimed: false,
    };

    setListings([newListing, ...listings]);
    setNewTitle('');
    setNewDescription('');
    setPostSuccess(true);
    setTimeout(() => {
      setPostSuccess(false);
      setActiveTab('feed');
    }, 1200);
  };

  // Filter listings
  const filteredListings = listings.filter((l) => {
    const matchesCategory = categoryFilter === 'all' || l.type === categoryFilter;
    const matchesSearch =
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A23" />
      <View style={styles.appContainer}>
        {/* Onboarding View if not selected */}
        {!hasCompletedOnboarding ? (
          <View style={styles.onboardingContainer}>
            <View style={styles.onboardingCard}>
              <Text style={styles.heroLogo}>🤝 NearbyHands</Text>
              <Text style={styles.heroTitle}>Mutual-Aid Neighborhood Sharing</Text>
              <Text style={styles.heroSubtitle}>
                Borrow tools, share excess food, and trade local skills with verified neighbors nearby.
              </Text>
              <Text style={styles.sectionHeader}>Choose Your Neighborhood:</Text>
              {NEIGHBORHOODS.map((nh) => (
                <TouchableOpacity
                  key={nh}
                  style={[styles.nhButton, selectedNeighborhood === nh && styles.nhButtonActive]}
                  onPress={() => setSelectedNeighborhood(nh)}
                >
                  <Text
                    style={[
                      styles.nhButtonText,
                      selectedNeighborhood === nh && styles.nhButtonTextActive,
                    ]}
                  >
                    📍 {nh}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => setHasCompletedOnboarding(true)}
              >
                <Text style={styles.primaryButtonText}>Join {selectedNeighborhood} Feed →</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.mainLayout}>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.headerBrand}>NearbyHands 🤝</Text>
                <TouchableOpacity
                  style={styles.locationBadge}
                  onPress={() => setHasCompletedOnboarding(false)}
                >
                  <Text style={styles.locationBadgeText}>📍 {selectedNeighborhood} (Change)</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[styles.badgePill, isChampion && styles.championPill]}
                onPress={() => setShowPaywall(true)}
              >
                <Text style={styles.badgePillText}>
                  {isChampion ? '⭐ Champion' : '🔥 Streak: ' + streakDays + 'd'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* TAB CONTENTS */}
            <View style={styles.body}>
              {/* FEED TAB */}
              {activeTab === 'feed' && (
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                  {/* Search bar */}
                  <View style={styles.searchBox}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search tools, food, skills..."
                      placeholderTextColor="#9CA3AF"
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                      <TouchableOpacity onPress={() => setSearchQuery('')}>
                        <Text style={styles.clearText}>✕</Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* Filter Pills */}
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
                    {['all', 'tool', 'food', 'skill'].map((cat) => (
                      <TouchableOpacity
                        key={cat}
                        style={[
                          styles.filterPill,
                          categoryFilter === cat && styles.filterPillActive,
                        ]}
                        onPress={() => setCategoryFilter(cat)}
                      >
                        <Text
                          style={[
                            styles.filterPillText,
                            categoryFilter === cat && styles.filterPillTextActive,
                          ]}
                        >
                          {cat === 'all'
                            ? '✨ All'
                            : cat === 'tool'
                            ? '🛠️ Tools'
                            : cat === 'food'
                            ? '🍞 Food'
                            : '💡 Skills'}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                  {/* Feed Items */}
                  {filteredListings.length === 0 ? (
                    <View style={styles.emptyState}>
                      <Text style={styles.emptyIcon}>📦</Text>
                      <Text style={styles.emptyTitle}>No listings found</Text>
                      <Text style={styles.emptySubtitle}>Be the first neighbor to post in this category!</Text>
                      <TouchableOpacity
                        style={styles.postNowBtn}
                        onPress={() => setActiveTab('post')}
                      >
                        <Text style={styles.postNowBtnText}>+ Post a Listing</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    filteredListings.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        style={[styles.listingCard, item.isClaimed && styles.listingCardClaimed]}
                        activeOpacity={0.85}
                        onPress={() => setSelectedListing(item)}
                      >
                        <View style={styles.cardHeader}>
                          <View style={styles.emojiBadge}>
                            <Text style={{ fontSize: 24 }}>{item.categoryEmoji}</Text>
                          </View>
                          <View style={styles.cardHeaderMeta}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardOwner}>
                              By {item.owner} • {item.neighborhood} • {item.timeAgo}
                            </Text>
                          </View>
                          {item.isClaimed ? (
                            <View style={styles.statusClaimed}>
                              <Text style={styles.statusClaimedText}>Claimed</Text>
                            </View>
                          ) : (
                            <View style={styles.statusAvailable}>
                              <Text style={styles.statusAvailableText}>Available</Text>
                            </View>
                          )}
                        </View>
                        <Text style={styles.cardDescription} numberOfLines={2}>
                          {item.description}
                        </Text>
                        <View style={styles.cardFooter}>
                          <Text style={styles.cardTag}>
                            #{item.type.toUpperCase()}
                          </Text>
                          <Text style={styles.viewDetailText}>View & Claim →</Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  )}
                </ScrollView>
              )}

              {/* POST TAB */}
              {activeTab === 'post' && (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                  <View style={styles.postCard}>
                    <Text style={styles.pageTitle}>Post a Neighbor Listing</Text>
                    <Text style={styles.pageSubtitle}>
                      Share a tool, home-cooked food, or offer a helpful skill to someone in {selectedNeighborhood}.
                    </Text>

                    <Text style={styles.label}>Select Category:</Text>
                    <View style={styles.typeSelector}>
                      {['tool', 'food', 'skill'].map((type) => (
                        <TouchableOpacity
                          key={type}
                          style={[styles.typeBtn, newType === type && styles.typeBtnActive]}
                          onPress={() => setNewType(type)}
                        >
                          <Text style={{ fontSize: 20 }}>
                            {type === 'tool' ? '🛠️' : type === 'food' ? '🍞' : '💡'}
                          </Text>
                          <Text
                            style={[
                              styles.typeBtnText,
                              newType === type && styles.typeBtnTextActive,
                            ]}
                          >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    <Text style={styles.label}>Title:</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="e.g. Lawn Mower, Extra sourdough loaf, Math tutoring"
                      placeholderTextColor="#9CA3AF"
                      value={newTitle}
                      onChangeText={setNewTitle}
                    />

                    <Text style={styles.label}>Description & Availability:</Text>
                    <TextInput
                      style={[styles.textInput, styles.textArea]}
                      placeholder="Describe the condition, dates or hours available, and pickup details..."
                      placeholderTextColor="#9CA3AF"
                      multiline
                      numberOfLines={4}
                      value={newDescription}
                      onChangeText={setNewDescription}
                    />

                    {postSuccess ? (
                      <View style={styles.successBanner}>
                        <Text style={styles.successText}>🎉 Listing posted to {selectedNeighborhood}!</Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={[
                          styles.primaryButton,
                          (!newTitle.trim() || !newDescription.trim()) && styles.disabledButton,
                        ]}
                        disabled={!newTitle.trim() || !newDescription.trim()}
                        onPress={handleCreatePost}
                      >
                        <Text style={styles.primaryButtonText}>Publish to Neighborhood Feed 🚀</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </ScrollView>
              )}

              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                  <View style={styles.profileHeaderCard}>
                    <View style={styles.avatar}>
                      <Text style={{ fontSize: 32 }}>🏡</Text>
                    </View>
                    <Text style={styles.profileName}>Neighbor in {selectedNeighborhood}</Text>
                    <Text style={styles.profileRole}>
                      {isChampion ? '⭐ Verified Community Champion' : 'Mutual-Aid Contributor'}
                    </Text>

                    {/* Streak & Stats */}
                    <View style={styles.statsRow}>
                      <View style={styles.statBox}>
                        <Text style={styles.statNumber}>🔥 {streakDays}</Text>
                        <Text style={styles.statLabel}>Day Streak</Text>
                      </View>
                      <View style={styles.statBox}>
                        <Text style={styles.statNumber}>📦 {listings.filter(l => l.owner === 'You').length}</Text>
                        <Text style={styles.statLabel}>Shared</Text>
                      </View>
                      <View style={styles.statBox}>
                        <Text style={styles.statNumber}>🤝 {claimedIds.length}</Text>
                        <Text style={styles.statLabel}>Claimed</Text>
                      </View>
                    </View>
                  </View>

                  {/* Badges */}
                  <View style={styles.badgesCard}>
                    <Text style={styles.sectionTitle}>Neighborhood Badges</Text>
                    <View style={styles.badgesGrid}>
                      <View style={styles.badgeItem}>
                        <Text style={styles.badgeIcon}>🌱</Text>
                        <Text style={styles.badgeItemName}>First Share</Text>
                        <Text style={styles.badgeItemStatus}>Unlocked</Text>
                      </View>
                      <View style={styles.badgeItem}>
                        <Text style={styles.badgeIcon}>🛠️</Text>
                        <Text style={styles.badgeItemName}>Tool Pioneer</Text>
                        <Text style={styles.badgeItemStatus}>Unlocked</Text>
                      </View>
                      <View style={styles.badgeItem}>
                        <Text style={styles.badgeIcon}>⭐</Text>
                        <Text style={styles.badgeItemName}>Champion</Text>
                        <Text style={styles.badgeItemStatus}>{isChampion ? 'Active' : 'Get Tier'}</Text>
                      </View>
                    </View>
                  </View>

                  {/* Champion Upgrade Card */}
                  {!isChampion && (
                    <TouchableOpacity
                      style={styles.championPromoCard}
                      onPress={() => setShowPaywall(true)}
                    >
                      <Text style={styles.championPromoTitle}>⭐ Community Champion Tier</Text>
                      <Text style={styles.championPromoSubtitle}>
                        Unlock unlimited active listings & 24h priority neighborhood visibility boost.
                      </Text>
                      <Text style={styles.championPromoLink}>Learn More →</Text>
                    </TouchableOpacity>
                  )}
                </ScrollView>
              )}

              {/* SETTINGS TAB */}
              {activeTab === 'settings' && (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                  <View style={styles.settingsGroup}>
                    <Text style={styles.sectionTitle}>Neighborhood Settings</Text>
                    <View style={styles.settingRow}>
                      <Text style={styles.settingLabel}>Current Neighborhood</Text>
                      <Text style={styles.settingValue}>{selectedNeighborhood}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.inlineButton}
                      onPress={() => setHasCompletedOnboarding(false)}
                    >
                      <Text style={styles.inlineButtonText}>Switch Neighborhood</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.settingsGroup}>
                    <Text style={styles.sectionTitle}>Demo Actions</Text>
                    <TouchableOpacity
                      style={styles.inlineButton}
                      onPress={() => {
                        setListings(INITIAL_LISTINGS);
                        setStreakDays(7);
                        setClaimedIds(['5']);
                        alert('Reset listings and seed data!');
                      }}
                    >
                      <Text style={styles.inlineButtonText}>🔄 Reset Seed Data</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.inlineButton, { marginTop: 10 }]}
                      onPress={() => setShowPaywall(true)}
                    >
                      <Text style={styles.inlineButtonText}>💳 View Subscription Paywall</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.settingsGroup}>
                    <Text style={styles.sectionTitle}>About</Text>
                    <Text style={styles.aboutText}>NearbyHands v1.0.0</Text>
                    <Text style={styles.aboutSub}>A local utility marketplace for mutual aid.</Text>
                  </View>
                </ScrollView>
              )}
            </View>

            {/* BOTTOM NAVIGATION */}
            <View style={styles.bottomNav}>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => setActiveTab('feed')}
              >
                <Text style={styles.navEmoji}>{activeTab === 'feed' ? '🏠' : '🏚️'}</Text>
                <Text style={[styles.navLabel, activeTab === 'feed' && styles.navLabelActive]}>
                  Feed
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => setActiveTab('post')}
              >
                <Text style={styles.navEmoji}>➕</Text>
                <Text style={[styles.navLabel, activeTab === 'post' && styles.navLabelActive]}>
                  Post
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => setActiveTab('profile')}
              >
                <Text style={styles.navEmoji}>{activeTab === 'profile' ? '👤' : '👥'}</Text>
                <Text style={[styles.navLabel, activeTab === 'profile' && styles.navLabelActive]}>
                  Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => setActiveTab('settings')}
              >
                <Text style={styles.navEmoji}>⚙️</Text>
                <Text style={[styles.navLabel, activeTab === 'settings' && styles.navLabelActive]}>
                  Settings
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* LISTING DETAIL MODAL */}
        <Modal
          visible={selectedListing !== null}
          animationType="slide"
          transparent
          onRequestClose={() => setSelectedListing(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {selectedListing && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={{ fontSize: 32 }}>{selectedListing.categoryEmoji}</Text>
                    <TouchableOpacity onPress={() => setSelectedListing(null)}>
                      <Text style={styles.modalCloseBtn}>✕</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.modalTitle}>{selectedListing.title}</Text>
                  <Text style={styles.modalSubtitle}>
                    Posted by {selectedListing.owner} in {selectedListing.neighborhood} • {selectedListing.timeAgo}
                  </Text>

                  <View style={styles.modalBadgeRow}>
                    <View style={styles.modalCategoryBadge}>
                      <Text style={styles.modalCategoryText}>
                        {selectedListing.type.toUpperCase()}
                      </Text>
                    </View>
                    {selectedListing.isClaimed ? (
                      <View style={styles.statusClaimed}>
                        <Text style={styles.statusClaimedText}>Already Claimed</Text>
                      </View>
                    ) : (
                      <View style={styles.statusAvailable}>
                        <Text style={styles.statusAvailableText}>Ready to Borrow</Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.modalDescriptionTitle}>Description & Details:</Text>
                  <Text style={styles.modalDescription}>{selectedListing.description}</Text>

                  <View style={styles.modalActions}>
                    {selectedListing.isClaimed ? (
                      <View style={styles.claimedNotice}>
                        <Text style={styles.claimedNoticeText}>
                          ✓ Claimed! You are connected with {selectedListing.owner}.
                        </Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => handleClaim(selectedListing)}
                      >
                        <Text style={styles.primaryButtonText}>
                          🤝 Request to Borrow / Claim
                        </Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={styles.secondaryButton}
                      onPress={() => setSelectedListing(null)}
                    >
                      <Text style={styles.secondaryButtonText}>Back to Feed</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>

        {/* REVENUECAT PAYWALL MODAL */}
        <Modal
          visible={showPaywall}
          animationType="fade"
          transparent
          onRequestClose={() => setShowPaywall(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.paywallContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.paywallCrown}>👑</Text>
                <TouchableOpacity onPress={() => setShowPaywall(false)}>
                  <Text style={styles.modalCloseBtn}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.paywallTitle}>Community Champion</Text>
              <Text style={styles.paywallSubtitle}>
                Support hyper-local mutual aid and power up your neighborhood impact!
              </Text>

              <View style={styles.perksList}>
                <View style={styles.perkItem}>
                  <Text style={styles.perkCheck}>✓</Text>
                  <Text style={styles.perkText}>Unlimited active tool & food listings</Text>
                </View>
                <View style={styles.perkItem}>
                  <Text style={styles.perkCheck}>✓</Text>
                  <Text style={styles.perkText}>24-Hour Priority Visibility Boost</Text>
                </View>
                <View style={styles.perkItem}>
                  <Text style={styles.perkCheck}>✓</Text>
                  <Text style={styles.perkText}>Exclusive Champion Profile Badge</Text>
                </View>
                <View style={styles.perkItem}>
                  <Text style={styles.perkCheck}>✓</Text>
                  <Text style={styles.perkText}>Instant notifications when requested items are posted</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.paywallSubscribeBtn}
                onPress={() => {
                  setIsChampion(true);
                  setShowPaywall(false);
                  alert('Thank you for supporting NearbyHands! You are now a Community Champion.');
                }}
              >
                <Text style={styles.paywallSubscribeBtnText}>
                  {isChampion ? 'Active Member' : 'Subscribe for $9.99/mo (Demo)'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.paywallDismissBtn}
                onPress={() => setShowPaywall(false)}
              >
                <Text style={styles.paywallDismissText}>Maybe Later</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0A23',
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  mainLayout: {
    flex: 1,
  },
  onboardingContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#0A0A23',
  },
  onboardingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  heroLogo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0A0A23',
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  nhButton: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  nhButtonActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
  },
  nhButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  nhButtonTextActive: {
    color: '#4F46E5',
  },
  header: {
    backgroundColor: '#0A0A23',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerBrand: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  locationBadge: {
    marginTop: 2,
  },
  locationBadgeText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '500',
  },
  badgePill: {
    backgroundColor: '#1E1E38',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  championPill: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
  },
  badgePillText: {
    color: '#FBBF24',
    fontSize: 12,
    fontWeight: '700',
  },
  body: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  clearText: {
    fontSize: 14,
    color: '#9CA3AF',
    paddingHorizontal: 6,
  },
  filterBar: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    marginRight: 8,
  },
  filterPillActive: {
    backgroundColor: '#0A0A23',
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
  },
  listingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  listingCardClaimed: {
    opacity: 0.7,
    backgroundColor: '#F9FAFB',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  emojiBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardHeaderMeta: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  cardOwner: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusAvailable: {
    backgroundColor: '#DEF7EC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusAvailableText: {
    color: '#03543F',
    fontSize: 11,
    fontWeight: '700',
  },
  statusClaimed: {
    backgroundColor: '#FDE8E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusClaimedText: {
    color: '#9B1C1C',
    fontSize: 11,
    fontWeight: '700',
  },
  cardDescription: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 10,
  },
  cardTag: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4F46E5',
  },
  viewDetailText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0A0A23',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  postNowBtn: {
    marginTop: 16,
    backgroundColor: '#0A0A23',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  postNowBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 18,
    lineHeight: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 6,
    marginTop: 12,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  typeBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  typeBtnActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
  },
  typeBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
    marginTop: 4,
  },
  typeBtnTextActive: {
    color: '#4F46E5',
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  primaryButton: {
    backgroundColor: '#0A0A23',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 18,
  },
  disabledButton: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  successBanner: {
    backgroundColor: '#DEF7EC',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 18,
  },
  successText: {
    color: '#03543F',
    fontWeight: '700',
    fontSize: 14,
  },
  profileHeaderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  profileRole: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 14,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  badgesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  badgesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  badgeItem: {
    alignItems: 'center',
  },
  badgeIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  badgeItemName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  badgeItemStatus: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '700',
    marginTop: 2,
  },
  championPromoCard: {
    backgroundColor: '#0A0A23',
    borderRadius: 14,
    padding: 18,
  },
  championPromoTitle: {
    color: '#FBBF24',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  championPromoSubtitle: {
    color: '#D1D5DB',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  championPromoLink: {
    color: '#60A5FA',
    fontSize: 13,
    fontWeight: '700',
  },
  settingsGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  settingLabel: {
    fontSize: 14,
    color: '#374151',
  },
  settingValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  inlineButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  inlineButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0A0A23',
  },
  aboutText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  aboutSub: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#0A0A23',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#1E1E38',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navEmoji: {
    fontSize: 20,
    marginBottom: 2,
  },
  navLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  navLabelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalCloseBtn: {
    fontSize: 20,
    color: '#9CA3AF',
    padding: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 14,
  },
  modalBadgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  modalCategoryBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  modalCategoryText: {
    color: '#4F46E5',
    fontSize: 11,
    fontWeight: '700',
  },
  modalDescriptionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  modalDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 20,
  },
  modalActions: {
    gap: 10,
  },
  secondaryButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  secondaryButtonText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 14,
  },
  claimedNotice: {
    backgroundColor: '#DEF7EC',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  claimedNoticeText: {
    color: '#03543F',
    fontWeight: '700',
    fontSize: 14,
  },
  paywallContent: {
    backgroundColor: '#0A0A23',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  paywallCrown: {
    fontSize: 36,
  },
  paywallTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 6,
  },
  paywallSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 20,
  },
  perksList: {
    marginBottom: 24,
    gap: 12,
  },
  perkItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  perkCheck: {
    color: '#10B981',
    fontSize: 18,
    fontWeight: '800',
    marginRight: 10,
  },
  perkText: {
    color: '#E5E7EB',
    fontSize: 14,
    fontWeight: '500',
  },
  paywallSubscribeBtn: {
    backgroundColor: '#F59E0B',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  paywallSubscribeBtnText: {
    color: '#0A0A23',
    fontSize: 15,
    fontWeight: '800',
  },
  paywallDismissBtn: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  paywallDismissText: {
    color: '#9CA3AF',
    fontSize: 13,
  },
});
