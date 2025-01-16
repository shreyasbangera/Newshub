export interface Article {
    id: string;
    title: string;
    description: string;
    url: string;
    imageUrl?: string;
    source: string;
    category: string;
    author?: string;
    publishedAt: string;
  }
  
  export type NewsSource = 'Newsapi' | 'Guardian' | 'Nytimes';
  export type Category = 'All' | 'General' | 'Business' | 'Technology' | 'Sports' | 'Entertainment' | 'Science' | 'Health';
  
  export interface NewsFilters {
    search: string;
    sources: NewsSource[];
    category: string;
    dateFrom?: string;
    dateTo?: string;
  }