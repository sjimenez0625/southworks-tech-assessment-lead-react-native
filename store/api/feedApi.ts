import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface FeedItem {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
}

// Mock data generator function to simulate API response
const generateMockFeedData = (): FeedItem[] => [
  {
    id: '1',
    title: 'React Native Best Practices',
    thumbnail: '📱',
    description: 'Learn the best practices for building React Native apps',
  },
  {
    id: '2',
    title: 'Expo Router Navigation',
    thumbnail: '🧭',
    description: 'Master file-based routing with Expo Router',
  },
  {
    id: '3',
    title: 'State Management in React',
    thumbnail: '⚛️',
    description: 'Understanding state management patterns and solutions',
  },
  {
    id: '4',
    title: 'TypeScript Tips & Tricks',
    thumbnail: '📘',
    description: 'Advanced TypeScript patterns for React Native',
  },
  {
    id: '5',
    title: 'UI/UX Design Principles',
    thumbnail: '🎨',
    description: 'Creating beautiful and intuitive mobile interfaces',
  },
  {
    id: '6',
    title: 'Performance Optimization',
    thumbnail: '⚡',
    description: 'Techniques to make your app faster and more efficient',
  },
];

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Feed'],
  endpoints: (builder) => ({
    getFeed: builder.query<FeedItem[], void>({
      queryFn: async () => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        return { data: generateMockFeedData() };
      },
      providesTags: ['Feed'],
    }),
    getFeedItem: builder.query<FeedItem, string>({
      queryFn: async (id) => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const items = generateMockFeedData();
        const item = items.find((item) => item.id === id);
        if (!item) {
          return { error: { status: 404, data: 'Item not found' } };
        }
        return { data: item };
      },
      providesTags: (result, error, id) => [{ type: 'Feed', id }],
    }),
  }),
});

export const { useGetFeedQuery, useGetFeedItemQuery } = feedApi;
