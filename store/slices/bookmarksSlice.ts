import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '@/types/article';

interface BookmarksState {
  bookmarkedArticles: Article[];
}

const initialState: BookmarksState = {
  bookmarkedArticles: [],
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setBookmarkedArticles(state, action: PayloadAction<Article[]>) {
      state.bookmarkedArticles = action.payload;
    },
    addBookmarkedArticle(state, action: PayloadAction<Article>) {
      if (!state.bookmarkedArticles.some(article => article.url === action.payload.url)) {
        state.bookmarkedArticles.push(action.payload);
      }
    },
    removeBookmarkedArticle(state, action: PayloadAction<string>) {
      state.bookmarkedArticles = state.bookmarkedArticles.filter(
        article => article.url !== action.payload
      );
    },
  },
});

export const {
  setBookmarkedArticles,
  addBookmarkedArticle,
  removeBookmarkedArticle,
} = bookmarksSlice.actions;

export default bookmarksSlice.reducer;