import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '@/types/article';

interface NewsState {
  articles: Article[];
  topHeadlines: Article[];
  categoryArticles: Record<string, Article[]>;
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  topHeadlines: [],
  categoryArticles: {},
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    fetchNewsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchNewsSuccess(state, action: PayloadAction<Article[]>) {
      state.articles = action.payload;
      state.loading = false;
    },
    fetchNewsFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchTopHeadlinesSuccess(state, action: PayloadAction<Article[]>) {
      state.topHeadlines = action.payload;
      state.loading = false;
    },
    fetchCategoryArticlesSuccess(
      state, 
      action: PayloadAction<{ category: string; articles: Article[] }>
    ) {
      state.categoryArticles[action.payload.category] = action.payload.articles;
      state.loading = false;
    },
  },
});

export const {
  fetchNewsStart,
  fetchNewsSuccess,
  fetchNewsFailed,
  fetchTopHeadlinesSuccess,
  fetchCategoryArticlesSuccess,
} = newsSlice.actions;

export default newsSlice.reducer;