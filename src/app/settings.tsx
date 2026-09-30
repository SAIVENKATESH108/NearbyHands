import React from 'react';
import { View, Text, StyleSheet, Switch, Button, AccessibilityInfo } from 'react-native';

const SettingsScreen = ({ navigation }: any) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [requestingReview, setRequestingReview] = React.useState(false);

  const requestNotificationPermission = async () => {
    try {
      const granted = await AccessibilityInfo.requestRocksPermissions?.() ||
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      setNotificationsEnabled(granted === 'granted');
    } catch (e) {
      console.error('Permission request failed', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Switch
        value={notificationsEnabled}
        onValueChange={setNotificationsEnabled}
        accessibilityLabel={notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}
        thumbColor="#fff"
        trackColor={{ false: '#767577', true: '#84cc16' }}
      />
      <Text style={styles.switchText} accessibilityLabel={notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}>
        {notificationsEnabled ? 'Enable notifications' : 'Disable notifications'}
      </Text>
      <Button title="Log Out" onPress={() => alert('Logged out')} accessibilityLabel="Log out of account" />
      <Button title="Delete Account" onPress={() => alert('Delete account')} accessibilityLabel="Delete your account" />
      {/* TODO: Add OneSignal notification preference link */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 24, color: '#0A0A23' },
  switchText: { fontSize: 16, marginLeft: 10, color: '#555' },
});

export default SettingsScreen;