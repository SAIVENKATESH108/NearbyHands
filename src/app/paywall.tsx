import React from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Switch, ScrollView } from 'react-native';
import { checkEntitlements, requestVisibilityBoost } from '../../src/purchases/config';

const PaywallScreen = ({ navigation }: any) => {
  const [loading, setLoading] = React.useState(false);
  const [entitlements, setEntitlements] = React.useState({
    hasCommunityChampion: false,
    hasUnlimitedListings: false,
  });
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  // Check entitlements on mount
  React.useEffect(() => {
    setLoading(true);
    checkEntitlements().then(setEntitlements).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleSubscribe = async () => {
    // TODO: Implement actual purchase flow
    // await Purchases.purchaseProduct(ENTITLEMENT_ID_PLACEHOLDER);
    alert('Subscribe pressed — purchase flow not yet implemented');
  };

  const handleBoost = () => {
    requestVisibilityBoost();
  };

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Community Champion</Text>
          <Text style={styles.subtitle}>Unlock unlimited claims & priority visibility</Text>
        </View>

        {/* Entitlement status */}
        <View style={styles.entitlementBox}>
          <Text style={styles.entitlementTitle}>Status</Text>
          <Text style={styles.entitlementDetail}>
            {entitlements.hasCommunityChampion ? 'Active' : 'Inactive'}
          </Text>
        </View>

        {/* Unlimited listings feature */}
        <View style={styles.featureBox}>
          <Text style={styles.featureTitle}>
            {entitlements.hasUnlimitedListings ? 'Unlimited Listings' : 'Limited Listings'}
          </Text>
          <Text style={styles.featureDetail}>
            {entitlements.hasUnlimitedListings ? 'Post as many listings as you want' : 'Max 5 active listings'}
          </Text>
        </View>

        {/* Boost visibility feature */}
        <View style={styles.featureBox}>
          <Text style={styles.featureTitle}>Boost a Listing</Text>
          <Text style={styles.featureDetail}>
            Watch an ad to boost a listing to the top of the feed for 24 hours
          </Text>
          <Button title="Boost with Ad" onPress={handleBoost} disabled={!entitlements.hasCommunityChampion} />
        </View>

        {/* Subscription action */}
        <View style={styles.subscriptionBox}>
          <Text style={styles.subscriptionTitle}>
            {entitlements.hasCommunityChampion ? 'You are a Community Champion!' : 'Subscribe Monthly'}
          </Text>
          <Button title={entitlements.hasCommunityChampion ? 'Restore' : 'Subscribe'} onPress={handleSubscribe} />
        </View>

        {/* Notifications toggle */}
        <View style={styles.notificationBox}>
          <Text style={styles.notificationLabel}>Enable notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            thumbColor="#fff"
            trackColor={{ false: '#767577', true: '#84cc16' }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 20 },
  header: { marginBottom: 30 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 4, color: '#0A0A23' },
  subtitle: { color: '#666', marginBottom: 20, fontSize: 16 },
  
  entitlementBox: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeft: { width: 4, color: '#0A0A23' }, // accent stripe
  },
  entitlementTitle: { fontSize: 15, fontWeight: '600', marginBottom: 6 },
  entitlementDetail: { color: '#27ae60', fontSize: 18 },
  
  featureBox: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  featureTitle: { fontSize: 16, fontWeight: '600', marginBottom: 6, color: '#0A0A23' },
  featureDetail: { color: '#555', fontSize: 14, lineHeight: 20 },
  
  subscriptionBox: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#0A0A23',
  },
  
  notificationBox: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationLabel: { fontSize: 16, color: '#555' },
  
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default PaywallScreen;