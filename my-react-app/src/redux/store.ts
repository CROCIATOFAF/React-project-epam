import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './slices/itemsSlice';
import themeReducer from './slices/themeSlice';
import { api } from '../api/api';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    theme: themeReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
