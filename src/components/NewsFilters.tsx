import React, { useEffect, useRef, useState } from 'react';
import { Search, Calendar, Filter } from 'lucide-react';;
import { fetchArticles, setFilters } from '../store/newsSlice';
import { Category, NewsSource } from '../types/news';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';

export const NewsFilters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.news.filters);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [newsSearch, setNewsSearch] = useState(filters.search)

  const sources: NewsSource[] = ['Newsapi', 'Guardian', 'Nytimes'];
  const categories: Category[] = [
    'All',
    'General',
    'Business',
    'Technology',
    'Sports',
    'Entertainment',
    'Science',
    'Health'
  ];

  useEffect(() => {
    dispatch(fetchArticles(filters))
  },[filters])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewsSearch(e.target.value)
    if(timer.current){
      clearInterval(timer.current)
    }
    timer.current = setTimeout(() => {
    dispatch(setFilters({ search: e.target.value }));
    },500)
  };

  const handleSourceToggle = (source: NewsSource) => {
    const newSources = filters.sources.includes(source)
      ? filters.sources.filter(s => s !== source)
      : [...filters.sources, source];
    dispatch(setFilters({ sources: newSources }));
  };

  const handleCategoryToggle = (category: Category) => {
    dispatch(setFilters({ category: category }));
  };

  const handleDateChange = (field: 'dateFrom' | 'dateTo', value: string) => {
    dispatch(setFilters({ [field]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-6">
      {/* Search */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Search className="h-4 w-4" />
          Search
        </label>
        <input
          type="text"
          value={newsSearch}
          onChange={handleSearchChange}
          placeholder="Search news..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Date Range */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Date Range
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleDateChange('dateFrom', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleDateChange('dateTo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Sources */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Sources
        </label>
        <div className="flex flex-wrap gap-2">
          {sources.map((source) => (
            <button
              key={source}
              onClick={() => handleSourceToggle(source)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${
                  filters.sources.includes(source)
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {source}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Categories
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryToggle(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${
                  filters.category === category
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};