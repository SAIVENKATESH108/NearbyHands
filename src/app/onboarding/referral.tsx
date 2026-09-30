import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, Text } from 'react-native';
import { useParams, useNavigation } from '@react-navigation/native';
import { processReferral, checkIfReferred, generateReferralCode } from '../../src/referrals/useReferrals';
import { supabase } from '../../supabase/client';

const ReferralScreen = () => {
  const { inviteCode } = useParams<string | string[] | undefined>();
  const navigation = useNavigation();

  // Mode: existing user generating their code
  if (!inviteCode) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Invite a Neighbor</Text>
        <Text style={styles.subtitle}>
          Get +3 helper streak days when someone joins using your code!
        </Text>
        <Button title="Generate My Code" onPress={() => navigation.generateReferralCode()} />
      </View>
    );
  }

  // Mode: new user joining with invite code
  const handleSubmit = async () => {
    if (!inviteCode || typeof inviteCode !== 'string') {
      alert('No invite code provided');
      return;
    }

    // Check if this code was already used
    const { referredBy, boostApplied } = await checkIfReferred(inviteCode);

    if (boostApplied) {
      alert('This invite code has already been used');
      navigation.replace('Feed');
      return;
    }

    if (referredBy === null) {
      alert('Invalid invite code');
      return;
    }

    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      await processReferral(inviteCode, user.id);
      alert('Welcome! +3 helper streak days added for you and your referrer!');
      navigation.replace('Feed');
    } else {
      // Sign up anonymously first
      const { error, data } = await supabase.auth.signUp({
        email: '',
        phone: '',
        data: { onboarding_complete: false },
      });

      if (error) {
        alert(error.message);
        return;
      }

      if (data.user) {
        await processReferral(inviteCode, data.user.id);
        alert('Welcome! +3 helper streak days added for you and your referrer!');
        navigation.replace('Feed');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join NearbyHands</Text>
      <Text style={styles.subtitle}>
        Enter the invite code to join and get +3 helper streak days!
      </Text>
      <TextInput
        placeholder="Invite code (6 characters)"
        value={inviteCode}
        onChangeText={() => {}}
        style={styles.input}
      />
      <Button title="Join NearbyHands" onPress={handleSubmit} disabled={!inviteCode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, marginBottom: 10, textAlign: 'center' },
  subtitle: { color: '#666', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    fontSize: 18,
    marginTop: 10,
  },
});

export default ReferralScreen;