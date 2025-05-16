import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './slices/newsSlice';
import bookmarksReducer from './slices/bookmarksSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    bookmarks: bookmarksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;