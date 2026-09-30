import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ListingDetailScreen = ({ route }: any) => {
  const { id } = route.params;
  const isClaimed = id === '2'; // placeholder logic
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listing Detail</Text>
      <Text style={styles.id}>ID: {id}</Text>
      {isClaimed ? (
        <Text style={styles.status}>This listing has been claimed</Text>
      ) : (
        <Button
          title="Request Claim"
          onPress={() => setIsLoading(true) && alert('Claim requested!')}
          accessibilityLabel={`Request claim for listing ${id}`}
        />
      )}
      <Button title="Back to Feed" onPress={() => {}} accessibilityLabel="Back to feed" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    // Ensure safe area insets are handled
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    color: '#0A0A23',
  },
  id: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
    fontFamily: 'system',
  },
  status: {
    color: '#dc3545',
    fontSize: 15,
    marginBottom: 24,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#0A0A23',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ListingDetailScreen;