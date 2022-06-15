import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  isCommited: null,
  didRequest: false,
  name: null,
};

export const viewerSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setViewer: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state = action.payload;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = viewerSlice.actions;

export default viewerSlice.reducer;
