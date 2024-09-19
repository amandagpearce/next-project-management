import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface initialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}

const initialState = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};

// to the global store will be saved at least 2 states
// the dark mode and the sidebar state(open / closed)
// it will be accessible anywhere in the app
export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setIsDarkMode, setIsSidebarCollapsed } = globalSlice.actions;
export default globalSlice.reducer;
