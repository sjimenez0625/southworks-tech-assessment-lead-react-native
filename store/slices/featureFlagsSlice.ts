import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FeatureFlags {
  showPromotionalBanner: boolean;
  enableDarkMode: boolean;
  enableNotifications: boolean;
}

interface FeatureFlagsState {
  flags: FeatureFlags;
}

const initialState: FeatureFlagsState = {
  flags: {
    showPromotionalBanner: true,
    enableDarkMode: false,
    enableNotifications: true,
  },
};

const featureFlagsSlice = createSlice({
  name: 'featureFlags',
  initialState,
  reducers: {
    toggleFlag: (state, action: PayloadAction<keyof FeatureFlags>) => {
      const flagName = action.payload;
      state.flags[flagName] = !state.flags[flagName];
    },
    setFlag: (state, action: PayloadAction<{ flag: keyof FeatureFlags; value: boolean }>) => {
      const { flag, value } = action.payload;
      state.flags[flag] = value;
    },
    resetFlags: (state) => {
      state.flags = initialState.flags;
    },
  },
});

export const { toggleFlag, setFlag, resetFlags } = featureFlagsSlice.actions;
export default featureFlagsSlice.reducer;

// Selectors
export const selectFeatureFlags = (state: { featureFlags: FeatureFlagsState }) => state.featureFlags.flags;
export const selectShowPromotionalBanner = (state: { featureFlags: FeatureFlagsState }) => 
  state.featureFlags.flags.showPromotionalBanner;
