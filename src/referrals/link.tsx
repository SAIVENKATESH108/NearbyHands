import React from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { share } from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';

const ReferralLinkScreen = () => {
  const navigation = useNavigation();
  const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  const inviteLink = `nearbyhands://invite/${inviteCode}`;

  const copyLink = async () => {
    try {
      await share.copyToClipboard(inviteLink);
      alert('Link copied to clipboard!');
    } catch (err) {
      alert('Failed to copy link');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invite a Neighbor</Text>
      <Text style={styles.subtitle}>
        Share this link and both you and your neighbor will get +3 helper streak days!
      </Text>
      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>{inviteLink}</Text>
        <Button title="Copy Link" onPress={copyLink} />
      </View>
      <Text style={styles.code}>Invite Code: {inviteCode}</Text>
      <Button title="Share via..." onPress={() => navigation.navigate('ShareOptions')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 10 },
  subtitle: { color: '#666', marginBottom: 20 },
  linkContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  linkText: { fontFamily: 'monospace', fontSize: 14, color: '#333' },
  code: { fontFamily: 'monospace', color: '#555', marginTop: 10 },
});

export default ReferralLinkScreen;