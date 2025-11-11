import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useGetProfileQuery } from '@/store/api/profileApi';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

export default function ProfileScreen() {
  const { data: userData, isLoading, isError, error } = useGetProfileQuery();

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            Profile
          </ThemedText>
        </ThemedView>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#007AFF" />
          <ThemedText style={styles.loadingText}>Loading profile...</ThemedText>
        </View>
      </ThemedView>
    );
  }

  if (isError || !userData) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            Profile
          </ThemedText>
        </ThemedView>
        <View style={styles.centerContent}>
          <ThemedText style={styles.errorText}>
            Error loading profile: {error?.toString()}
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Profile
        </ThemedText>
      </ThemedView>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <ThemedText style={styles.avatarText}>
              {userData.name.split(' ').map(n => n[0]).join('')}
            </ThemedText>
          </View>
        </View>

        {/* User Info */}
        <ThemedView style={styles.infoSection}>
          <ThemedText type="title" style={styles.name}>
            {userData.name}
          </ThemedText>
          <ThemedText style={styles.email}>{userData.email}</ThemedText>
          <ThemedText style={styles.bio}>{userData.bio}</ThemedText>
          <ThemedText style={styles.location}>📍 {userData.location}</ThemedText>
        </ThemedView>

        {/* Stats */}
        <ThemedView style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ThemedText type="subtitle" style={styles.statValue}>
              {userData.posts}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Posts</ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <ThemedText type="subtitle" style={styles.statValue}>
              {userData.followers}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Followers</ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <ThemedText type="subtitle" style={styles.statValue}>
              {userData.following}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Following</ThemedText>
          </View>
        </ThemedView>

        {/* Additional Info Cards */}
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Account Settings
          </ThemedText>
          <ThemedText style={styles.cardItem}>✏️ Edit Profile</ThemedText>
          <ThemedText style={styles.cardItem}>🔔 Notifications</ThemedText>
          <ThemedText style={styles.cardItem}>🔒 Privacy</ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Preferences
          </ThemedText>
          <ThemedText style={styles.cardItem}>🌙 Dark Mode</ThemedText>
          <ThemedText style={styles.cardItem}>🌐 Language</ThemedText>
          <ThemedText style={styles.cardItem}>ℹ️ About</ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infoSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    opacity: 0.6,
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
  },
  location: {
    fontSize: 14,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    marginBottom: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.6,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  card: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardItem: {
    fontSize: 16,
    paddingVertical: 8,
    opacity: 0.8,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
  },
});
