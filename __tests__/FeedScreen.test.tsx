import FeedScreen from '@/app/(tabs)/index';
import * as feedApiModule from '@/store/api/feedApi';
import { screen, waitFor } from '@testing-library/react-native';
import React from 'react';
import { mockFeedData, renderWithProviders } from './test-utils';

// Mock the feedApi
jest.mock('@/store/api/feedApi', () => ({
  feedApi: {
    reducerPath: 'feedApi',
    reducer: (state = {}) => state,
    middleware: jest.fn(() => (next: any) => (action: any) => next(action)),
    endpoints: {},
  },
  useGetFeedQuery: jest.fn(),
  FeedItem: {},
}));

describe('FeedScreen', () => {
  const mockUseGetFeedQuery = feedApiModule.useGetFeedQuery as jest.MockedFunction<
    typeof feedApiModule.useGetFeedQuery
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test 1: Should render loading state initially
   */
  test('renders loading state when data is being fetched', () => {
    // Mock the hook to return loading state
    mockUseGetFeedQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: undefined,
    } as any);

    renderWithProviders(<FeedScreen />);

    // Check for loading text
    expect(screen.getByText('Loading feed...')).toBeTruthy();
    
    // Check for activity indicator (it renders but may not have accessible text)
    expect(screen.getByText('Feed')).toBeTruthy(); // Header should still render
  });

  /**
   * Test 2: Should render feed items when data is successfully loaded
   */
  test('renders feed items successfully when data is loaded', async () => {
    mockUseGetFeedQuery.mockReturnValue({
      data: mockFeedData,
      isLoading: false,
      isError: false,
      error: undefined,
    } as any);

    renderWithProviders(<FeedScreen />);

    // Wait for the feed items to render
    await waitFor(() => {
      // Check that feed items are rendered
      expect(screen.getByText('React Native Best Practices')).toBeTruthy();
      expect(screen.getByText('Expo Router Navigation')).toBeTruthy();
      expect(screen.getByText('State Management in React')).toBeTruthy();
    });

    // Check descriptions
    expect(screen.getByText('Learn the best practices for building React Native apps')).toBeTruthy();
    expect(screen.getByText('Master file-based routing with Expo Router')).toBeTruthy();
    
    // Check that thumbnails (emojis) are rendered
    expect(screen.getByText('📱')).toBeTruthy();
    expect(screen.getByText('🧭')).toBeTruthy();
    expect(screen.getByText('⚛️')).toBeTruthy();
  });

  /**
   * Test 3: Should render error state when data fetching fails
   */
  test('renders error message when data fetching fails', () => {
    const mockError = new Error('Network request failed');
    
    mockUseGetFeedQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: mockError,
    } as any);

    renderWithProviders(<FeedScreen />);

    // Check for error message
    expect(screen.getByText(/Error loading feed/i)).toBeTruthy();
    expect(screen.getByText(/Network request failed/i)).toBeTruthy();
  });

  /**
   * Test 4 (Bonus): Should render the promotional banner when feature flag is enabled
   */
  test('renders promotional banner when feature flag is enabled', () => {
    mockUseGetFeedQuery.mockReturnValue({
      data: mockFeedData,
      isLoading: false,
      isError: false,
      error: undefined,
    } as any);

    renderWithProviders(<FeedScreen />);

    // Check for banner content (default state is banner shown)
    expect(screen.getByText('Special Offer!')).toBeTruthy();
    expect(screen.getByText('Get 50% off on premium features. Limited time only!')).toBeTruthy();
    expect(screen.getByText('🎉')).toBeTruthy();
  });

  /**
   * Test 5 (Bonus): Should render Feed header
   */
  test('renders Feed screen header with title', () => {
    mockUseGetFeedQuery.mockReturnValue({
      data: mockFeedData,
      isLoading: false,
      isError: false,
      error: undefined,
    } as any);

    renderWithProviders(<FeedScreen />);

    // Check for header title
    const feedHeaders = screen.getAllByText('Feed');
    expect(feedHeaders.length).toBeGreaterThan(0);
    expect(feedHeaders[0]).toBeTruthy();
  });

  /**
   * Test 6 (Bonus): Should render correct number of feed items
   */
  test('renders correct number of feed items', async () => {
    mockUseGetFeedQuery.mockReturnValue({
      data: mockFeedData,
      isLoading: false,
      isError: false,
      error: undefined,
    } as any);

    renderWithProviders(<FeedScreen />);

    await waitFor(() => {
      // Check that all 3 mock items are rendered
      const items = mockFeedData.map(item => screen.getByText(item.title));
      expect(items).toHaveLength(3);
    });
  });
});
