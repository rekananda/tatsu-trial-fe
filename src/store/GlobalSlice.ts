import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface State {
  authenticated: boolean;
  counter: number;
}

const initialState: State = {
  authenticated: true,
  counter: 10,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setCounter: (state: State, action: PayloadAction<number>) => {
      state.counter = action.payload;
    },
    addCounter: (state: State) => {
      state.counter = state.counter + 1;
    },
    reduceCounter: (state: State) => {
      state.counter = state.counter - 1;
    },
    setAuthenticated: (state: State, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
  },
});

export const { setCounter, addCounter, reduceCounter, setAuthenticated } = globalSlice.actions;

export default globalSlice.reducer;
