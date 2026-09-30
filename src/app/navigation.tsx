import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, createStackNavigator } from '@react-navigation/native';
import OnboardingScreen from './index';
import FeedScreen from './feed';
import PostScreen from './post';
import ProfileScreen from './profile';
import ListingDetailScreen from './listing-detail';
import PaywallScreen from './paywall';
import SettingsScreen from './settings';

// Bottom tab navigator
const TabNavigator = createBottomTabNavigator(
  {
    Feed: FeedScreen,
    Post: PostScreen,
    Profile: ProfileScreen,
  },
  {
    screenOptions: {
      tabBarShowLabel: true,
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: '#888',
      tabBarStyle: { backgroundColor: '#0A0A23', height: 60 },
    },
  }
);

// Stack navigator for detail/modal screens
const StackNavigator = createStackNavigator(
  {
    App: TabNavigator,
    ListingDetail: ListingDetailScreen,
    Paywall: PaywallScreen,
    Settings: SettingsScreen,
  },
  {
    screenOptions: {
      headerShown: false,
    },
  }
);

// Main app navigator (stack with tabs at root + detail screens)
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator
        initialRouteName="App"
        screenOptions={({ route }) => ({
          headerShown: false,
        })}
      >
        <StackNavigator.Screen name="App" component={TabNavigator} />
        <StackNavigator.Screen name="ListingDetail" component={ListingDetailScreen} />
        <StackNavigator.Screen name="Paywall" component={PaywallScreen} />
        <StackNavigator.Screen name="Settings" component={SettingsScreen} />
      </StackNavigator>
    </NavigationContainer>
  );
};

export default AppNavigator;