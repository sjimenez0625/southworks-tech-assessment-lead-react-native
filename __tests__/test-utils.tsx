import { store } from '@/store';
import { render, RenderOptions } from '@testing-library/react-native';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';

// Create a custom render function that includes Redux Provider
interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {}

export function renderWithProviders(
  ui: ReactElement,
  renderOptions?: ExtendedRenderOptions
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Mock data for tests
export const mockFeedData = [
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
];

export const mockUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  bio: 'React Native developer passionate about building beautiful mobile experiences',
  location: 'San Francisco, CA',
  followers: 1234,
  following: 567,
  posts: 89,
};

// Re-export everything from React Native Testing Library
export * from '@testing-library/react-native';
