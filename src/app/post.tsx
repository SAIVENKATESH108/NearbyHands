import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const PostScreen = () => {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Post a Listing</Text>
      <Text style={styles.subtitle}>Share tools, food, or skills with your neighborhood</Text>
      <Button title="Post Tool" onPress={() => alert('Post tool selected')} />
      <Button title="Post Food" onPress={() => alert('Post food selected')} />
      <Button title="Post Skill" onPress={() => alert('Post skill selected')} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
  subtitle: { color: '#666', marginBottom: 20 },
});

export default PostScreen;