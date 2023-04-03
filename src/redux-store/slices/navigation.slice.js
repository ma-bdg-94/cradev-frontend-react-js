import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  sidebarOpened: false,
  activeItem: JSON.parse(localStorage.getItem('staticSidebar')) ? window.location.pathname : null
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.sidebarOpened = true
    },
    closeSidebar: (state) => {
      state.sidebarOpened = false
    },
    changeActiveSidebarItem: (state, { payload }) => {
      state.activeItem = payload
    }
  }
})

export const {
  openSidebar,
  closeSidebar,
  changeActiveSidebarItem
} = navigationSlice.actions;

export default navigationSlice.reducer;
