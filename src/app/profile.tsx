import React from 'react';
import { View, Text, StyleSheet, Button, Animated, LayoutAnimation } from 'react-native';

const ProfileScreen = () => {
  const [badgeEarned, setBadgeEarned] = React.useState(false);
  const [streakCount, setStreakCount] = React.useState(7); // placeholder
  const [streakAnimFinished, setStreakAnimFinished] = React.useState(false);

  // Simulate badge earn animation
  React.useEffect(() => {
    // In a real app, this would trigger on first badge earn
    const badgeAnim = Animated.sequence([
      Animated.opacity(0),
      Animated.scale(0, 0.5),
      Animated.opacity(1),
      Animated.scale(1, 1),
    ]);

    Animated.timing(badgeAnim, {
      duration: 500,
      useNativeDriver: true,
    }).stop();

    setBadgeEarned(true);
  }, []);

  // Streak increment animation
  const incrementStreak = () => {
    // Update streak count (placeholder: add 1)
    setStreakCount(prev => prev + 1);

    // Trigger layout animation for streak number change
    LayoutAnimation.begin();
    LayoutAnimation.configureNext(LayoutAnimation.PresetType.easeInOut);
    setStreakAnimFinished(true);

    setTimeout(() => setStreakAnimFinished(false), 300);
  };

  // Reset badge earned state after animation completes
  React.useEffect(() => {
    if (badgeEarned) {
      const timeout = setTimeout(() => setBadgeEarned(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [badgeEarned]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Your streak, badges, and activity</Text>

      {/* Streak display with animation */}
      <Animated.View
        style={[
          styles.streakContainer,
          { transform: streakAnimFinished ? null : { scale: 1.2 } },
        ]}
      >
        <Text style={styles.streakLabel}>Helper Streak</Text>
        <Text style={styles.streakValue}>{streakCount} days</Text>
      </Animated.View>

      {/* Badge grid with unlock animation */}
      <View style={styles.badgesContainer}>
        {['Tool Master', 'Food Hero', 'Skill Sharer'].map((badgeName, i) => (
          <View
            key={i}
            style={[
              styles.badgeCard,
              badgeEarned && i === 0 && { animate: true }, // First badge unlock demo
            ]}
          >
            <Text style={styles.badgeIcon}>🏆</Text>
            <Text style={styles.badgeName}>{badgeName}</Text>
          </View>
        ))}
      </View>

      <Button title="Complete a Claim" onPress={incrementStreak} accessibilityLabel="Complete claim to increase helper streak" />
      <Button title="View Listings" onPress={() => {}} accessibilityLabel="View my listings" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 8 },
  subtitle: { color: '#666', marginBottom: 20 },

  /* Streak display styles */
  streakContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  streakLabel: { fontSize: 16, color: '#555', marginRight: 6 },
  streakValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0A0A23',
    // Dynamic Type friendly: use system font
    fontFamily: 'system',
  },

  /* Badge styles */
  badgesContainer: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  badgeCard: {
    width: 70,
    height: 70,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  badgeIcon: { fontSize: 32, marginBottom: 4 },
  badgeName: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'system',
  },

  /* Animation prop (used by child) */
  badgeCard: { transition: { duration: 0.5 } },
});

export default ProfileScreen;