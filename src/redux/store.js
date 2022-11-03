import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from './api';
import { contactsSlice } from './contactsSlice';

export const store = configureStore({
  reducer: {
    filter: contactsSlice.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});
