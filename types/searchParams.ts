export interface SearchParams {
  q: string;
  language?: string;
  sortBy?: 'publishedAt' | 'relevancy' | 'popularity';
  from?: string;
  to?: string;
  pageSize?: number;
  page?: number;
}