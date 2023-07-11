import { createSlice } from "@reduxjs/toolkit";

interface InitialUIProps {
  drawerOpen: boolean;
}

const initialState: InitialUIProps = {
  drawerOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.drawerOpen = true;
    },
    closeDrawer: (state) => {
      state.drawerOpen = false;
    },
  },
});

export const { openDrawer, closeDrawer } = uiSlice.actions;

export default uiSlice.reducer;
