import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated, useRef } from 'react-native';

const FeedScreen = ({ navigation }: any) => {
  const sampleListings = [
    { id: '1', title: 'Cordless Drill', type: 'tool', description: '18V cordless drill with extras' },
    { id: '2', title: 'Sourdough Bread', type: 'food', description: 'Freshly baked sourdough loaf' },
    { id: '3', title: 'Spanish Lessons', type: 'skill', description: 'Learn basic Spanish conversation' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed</Text>
      <FlatList
        data={sampleListings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const pressAnim = useRef(new Animated.Value(1)).current;

          return (
            <TouchableOpacity
              style={listItem}
              onPressIn={() => Animated.timing(pressAnim, { toValue: 0.95, duration: 100, useNativeDriver: true })} 
              onPressOut={() => Animated.timing(pressAnim, { toValue: 1, duration: 100, useNativeDriver: true })}
              onPress={() => navigation.navigate('ListingDetail', { id: item.id })}>
              <Animated.View style={[{ ...listItemText }, { transform: [{ scale: pressAnim }] }]}>{item.title} ({item.type})</Animated.View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20 },
  listItem: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  listItemText: {
    fontSize: 16,
    // Dynamic Type: allow font scaling
    allowFontScaling: true,
  },
});

export default FeedScreen;