import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleSelectNeighborhood = () => {
    // Navigate to the main app with bottom tabs
    navigation.replace('App');
  };

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Select Your Neighborhood</Text>
      <Text style={styles.subtitle}>Choose your area to see local listings</Text>
      <Button title="Downtown" onPress={handleSelectNeighborhood} />
      <Button title="Uptown" onPress={handleSelectNeighborhood} />
      <Button title="Midtown" onPress={handleSelectNeighborhood} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
  subtitle: { color: '#666', marginBottom: 20 },
});

export default OnboardingScreen;