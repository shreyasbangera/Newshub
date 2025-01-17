import axios from 'axios';
import { Article, Category, NewsFilters } from '../types/news';
import { showErrorToast } from '../utils/toast';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

const categoryMappings = {
  newsapi: {
    General: 'general',
    Business: 'business',
    Technology: 'technology',
    Sports: 'sports',
    Entertainment: 'entertainment',
    Science: 'science',
    Health: 'health'
  },
  guardian: {
    General: 'news',
    Business: 'business',
    Technology: 'technology',
    Sports: 'sport', 
    Entertainment: 'culture',
    Science: 'science',
    Health: 'health'
  },
  nytimes: {
    General: 'news',
    Business: 'business',
    Technology: 'technology',
    Sports: 'sports',
    Entertainment: 'arts',
    Science: 'science',
    Health: 'health'
  }
};

const normalizeCategory = (apiCategory: string): Category => {
  const map: Record<string, Category> = {
    'general': 'General',
    'news': 'General',
    'business': 'Business',
    'technology': 'Technology',
    'sports': 'Sports',
    'sport': 'Sports',
    'entertainment': 'Entertainment',
    'culture': 'Entertainment',
    'arts': 'Entertainment',
    'science': 'Science',
    'health': 'Health',
    'healthcare': 'Health'
  };
  return map[apiCategory.toLowerCase()] || 'General';
};


// Normalize article data from different sources to our Article type
const normalizeArticle = (article: any, source: string, category: string ): Article | null=> {
  if (
    article.title?.includes("[Removed]") ||
    article.description?.includes("[Removed]") ||
    article.content?.includes("[Removed]") ||
    article.url?.includes("[Removed]")
  ) {
    return null;
  }
  return {
  id: article.id || article.url || Math.random().toString(),
  title: article.title || article.webTitle || article.headline?.main || '',
  description: article.description || article.abstract || article.snippet || article.fields?.trailText || '',
  url: article.url || article.webUrl || article.web_url || '',
  imageUrl: article.urlToImage || article.multimedia?.[0]?.url && "https://static01.nyt.com/"+article.multimedia?.[0]?.url || article.fields?.thumbnail || undefined,
  source,
  category: normalizeCategory(article.category || article.sectionName || article.section_name || category || 'General'),
  author: article.author || article.byline?.original || undefined,
  publishedAt: article.publishedAt || article.webPublicationDate || article.pub_date || new Date().toISOString(),
  }
};

export const fetchNewsApi = async (filters: NewsFilters): Promise<Article[]> => {
  // Date range isnt available in NewsAPI for /top-headlines and Categories isnt avaialable for /everything
  const category = filters.category != 'All' ? categoryMappings.newsapi[filters.category as keyof typeof categoryMappings.newsapi] : 'news'
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: filters.search.length ? `${filters.search} ${category}`: category,
        from: filters.dateFrom,
        to: filters.dateTo,
        apiKey: NEWS_API_KEY,
      },
    });
    return response.data.articles
      .map((article: any) => normalizeArticle(article, 'newsapi', filters.category))
      .filter((article: Article | null) => article !== null)
      .slice(0, 10) as Article[];
  } catch (error) {
    showErrorToast('Error fetching news from NewsAPI');
    console.error('NewsAPI fetch error:', error);
    return [];
  }
};

export const fetchGuardian = async (filters: NewsFilters): Promise<Article[]> => {
  try {

    const response = await axios.get('https://content.guardianapis.com/search', {
      params: {
        q: filters.search || 'news',
        'from-date': filters.dateFrom,
        'to-date': filters.dateTo,
        'api-key': GUARDIAN_API_KEY,
        'section': filters.category !== 'All' ? categoryMappings.guardian[filters.category as keyof typeof categoryMappings.guardian] : null,
        'show-fields': 'trailText,thumbnail'
      },
    });
    return response.data.response.results
      .map((article: any) => normalizeArticle(article, 'guardian', filters.category))
      .filter((article: Article | null) => article !== null) as Article[];
  } catch (error) {
    showErrorToast('Error fetching news from The Guardian');
    console.error('Guardian fetch error:', error);
    return [];
  }
};

export const fetchNYT = async (filters: NewsFilters): Promise<Article[]> => {
  try {
    const response = await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params: {
        q: filters.search || 'news',
        begin_date: filters.dateFrom?.replace(/-/g, ''),
        end_date: filters.dateTo?.replace(/-/g, ''),
        'api-key': NYT_API_KEY,
        fq: filters.category !== 'All'
          ? `section_name:"${categoryMappings.nytimes[filters.category as keyof typeof categoryMappings.newsapi]}"`
          : ''
      },
    });
    return response.data.response.docs
      .map((article: any) => normalizeArticle(article, 'nytimes', filters.category))
      .filter((article: Article | null) => article !== null)
      .slice(0, 10) as Article[];
  } catch (error) {
    showErrorToast('Error fetching news from The New York Times');
    console.error('NYT fetch error:', error);
    return [];
  }
};
