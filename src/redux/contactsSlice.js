import { createSlice } from '@reduxjs/toolkit';

export const contactsSlice = createSlice({
  name: 'contacts',
  // initialState: { filter: '' },
  reducers: {
    changeFilter(state, { payload }) {
      state.filter = payload;
    },
  },
});
