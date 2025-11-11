import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface UserData {
  name: string;
  email: string;
  bio: string;
  location: string;
  followers: number;
  following: number;
  posts: number;
}

// Mock data generator function to simulate API response
const generateMockUserData = (): UserData => ({
  name: 'John Doe',
  email: 'john.doe@example.com',
  bio: 'React Native developer passionate about building beautiful mobile experiences',
  location: 'San Francisco, CA',
  followers: 1234,
  following: 567,
  posts: 89,
});

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfile: builder.query<UserData, void>({
      queryFn: async () => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        return { data: generateMockUserData() };
      },
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<UserData, Partial<UserData>>({
      queryFn: async (updates) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const currentData = generateMockUserData();
        const updatedData = { ...currentData, ...updates };
        return { data: updatedData };
      },
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
