// Jest setup file
import '@testing-library/jest-native/extend-expect';

// Mock expo-router
jest.mock('expo-router', () => ({
  ...jest.requireActual('expo-router'),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
}));

// Mock Logger
jest.mock('./services/Logger', () => ({
  Logger: {
    init: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    apiError: jest.fn(),
    logNavigation: jest.fn(),
    logEvent: jest.fn(),
    logPerformance: jest.fn(),
    setUser: jest.fn(),
    getLogs: jest.fn(),
    clearLogs: jest.fn(),
    exportLogs: jest.fn(),
  },
}));

// Mock profileApi
jest.mock('./store/api/profileApi', () => ({
  profileApi: {
    reducerPath: 'profileApi',
    reducer: (state = {}) => state,
    middleware: jest.fn(() => (next: any) => (action: any) => next(action)),
    endpoints: {},
  },
  useGetProfileQuery: jest.fn(),
  useUpdateProfileMutation: jest.fn(),
}));

// Silence console warnings in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
