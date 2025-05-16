import axios from 'axios';
import { Article } from '@/types/article';
import { SearchParams } from '@/types/searchParams';

// Mock API key for demo purposes
// In a real app, this would be stored in environment variables
const API_KEY = 'YOUR_NEWS_API_KEY';
const BASE_URL = 'https://newsapi.org/v2';

// Mock data for demo purposes
import { mockArticles } from '@/constants/mockData';

interface TopHeadlinesParams {
  country?: string;
  category?: string;
  pageSize?: number;
  page?: number;
}

// In a real app, we would call the actual News API
// For demo purposes, we're using mock data
export const fetchTopHeadlines = async (params: TopHeadlinesParams = {}): Promise<Article[]> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter mock data based on category if provided
    if (params.category) {
      return mockArticles.filter(article => 
        article.category === params.category
      );
    }
    
    return mockArticles;
    
    // Real API call (commented out since we're using mock data)
    /*
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        ...params,
        apiKey: API_KEY,
        pageSize: params.pageSize || 20,
      },
    });
    
    return response.data.articles;
    */
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw error;
  }
};

export const searchNews = async (params: SearchParams): Promise<Article[]> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Filter mock data based on search query
    const query = params.q.toLowerCase();
    return mockArticles.filter(article => 
      article.title.toLowerCase().includes(query) || 
      (article.description && article.description.toLowerCase().includes(query))
    );
    
    // Real API call (commented out since we're using mock data)
    /*
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        ...params,
        apiKey: API_KEY,
        pageSize: params.pageSize || 20,
      },
    });
    
    return response.data.articles;
    */
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};

export const getArticleById = async (id: string): Promise<Article> => {
  try {
    // Decode the URL which was used as the ID
    const url = decodeURIComponent(id);
    
    // Find the article in our mock data
    const article = mockArticles.find(a => a.url === url);
    
    if (!article) {
      throw new Error('Article not found');
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return article;
  } catch (error) {
    console.error('Error fetching article by ID:', error);
    throw error;
  }
};