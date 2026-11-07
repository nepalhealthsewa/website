import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  mobileMenuOpen: boolean;
  selectedBloodGroup: string;
  selectedDistrict: string;
  searchQuery: string;
}

const initialState: UiState = {
  mobileMenuOpen: false,
  selectedBloodGroup: 'ALL',
  selectedDistrict: 'ALL',
  searchQuery: '',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload;
    },
    setSelectedBloodGroup: (state, action: PayloadAction<string>) => {
      state.selectedBloodGroup = action.payload;
    },
    setSelectedDistrict: (state, action: PayloadAction<string>) => {
      state.selectedDistrict = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    resetFilters: (state) => {
      state.selectedBloodGroup = 'ALL';
      state.selectedDistrict = 'ALL';
      state.searchQuery = '';
    },
  },
});

export const {
  toggleMobileMenu,
  setMobileMenuOpen,
  setSelectedBloodGroup,
  setSelectedDistrict,
  setSearchQuery,
  resetFilters,
} = uiSlice.actions;

export default uiSlice.reducer;
