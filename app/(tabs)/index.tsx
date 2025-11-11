import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useGetFeedQuery, type FeedItem } from '@/store/api/feedApi';
import { selectShowPromotionalBanner, toggleFlag } from '@/store/slices/featureFlagsSlice';
import React from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function FeedScreen() {
  const { data: feedData, isLoading, isError, error } = useGetFeedQuery();
  const showBanner = useSelector(selectShowPromotionalBanner);
  const dispatch = useDispatch();

  const renderItem = ({ item }: { item: FeedItem }) => (
    <ThemedView style={styles.card}>
      <View style={styles.thumbnailContainer}>
        <Text style={styles.thumbnailEmoji}>{item.thumbnail}</Text>
      </View>
      <View style={styles.contentContainer}>
        <ThemedText type="subtitle" style={styles.title}>
          {item.title}
        </ThemedText>
        <ThemedText style={styles.description}>{item.description}</ThemedText>
      </View>
    </ThemedView>
  );

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            Feed
          </ThemedText>
        </ThemedView>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#007AFF" />
          <ThemedText style={styles.loadingText}>Loading feed...</ThemedText>
        </View>
      </ThemedView>
    );
  }

  if (isError) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            Feed
          </ThemedText>
        </ThemedView>
        <View style={styles.centerContent}>
          <ThemedText style={styles.errorText}>
            Error loading feed: {error?.toString()}
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Feed
        </ThemedText>
        <Pressable 
          onPress={() => dispatch(toggleFlag('showPromotionalBanner'))}
          style={styles.toggleButton}
        >
          <ThemedText style={styles.toggleButtonText}>
            {showBanner ? '🔔 Hide Banner' : '🔕 Show Banner'}
          </ThemedText>
        </Pressable>
      </ThemedView>
      
      {showBanner && (
        <View style={styles.banner}>
          <Text style={styles.bannerEmoji}>🎉</Text>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Special Offer!</Text>
            <Text style={styles.bannerText}>
              Get 50% off on premium features. Limited time only!
            </Text>
          </View>
          <Pressable 
            onPress={() => dispatch(toggleFlag('showPromotionalBanner'))}
            style={styles.bannerCloseButton}
          >
            <Text style={styles.bannerCloseText}>×</Text>
          </Pressable>
        </View>
      )}
      
      <FlatList
        data={feedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  toggleButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  banner: {
    backgroundColor: '#FFD60A',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  bannerEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 14,
    color: '#1D1D1F',
  },
  bannerCloseButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 14,
  },
  bannerCloseText: {
    fontSize: 24,
    color: '#1D1D1F',
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnailContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  thumbnailEmoji: {
    fontSize: 32,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
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
