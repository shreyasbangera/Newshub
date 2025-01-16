import React from 'react';
import { ExternalLink, Clock, User, ImageOff } from 'lucide-react';
import { format } from 'date-fns';
import { Article } from '../types/news';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
          />
        ) : (
          <div className='w-full flex h-48 sm:h-56 md:h-64 items-center justify-center bg-gray-200'>
            <ImageOff className='text-gray-400 w-12 h-12' />
          </div>
        )}
        <div className="absolute top-2 left-2 flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {article.source.slice(0,1).toUpperCase() + article.source.slice(1).toLowerCase()}
          </span>
          <span className="px-2 py-1 bg-gray-100  text-gray-800  text-xs font-medium rounded-full">
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <h2 className="text-xl text-left sm:text-2xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h2>
        <p className="text-gray-600 text-left mb-4 line-clamp-3 flex-grow">{article.description}</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-500 dark:text-gray-400 gap-2 sm:gap-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span className="truncate max-w-[100px]">{article.author ?? "Anonymous"}</span>
              </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{format(new Date(article.publishedAt), 'MMM d, yyyy')}</span>
            </div>
          </div>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-blue-600  hover:text-blue-800 transition-colors duration-200"
          >
            <span>Read more</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
};

