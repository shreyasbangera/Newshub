import React from 'react'

export const ArticleCardSkeleton: React.FC = () => {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full animate-pulse">
        <div className="relative">
          <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-200" />
          <div className="absolute top-2 left-2 flex gap-2">
            <div className="w-16 h-6 bg-gray-200 rounded-full" />
            <div className="w-20 h-6 bg-gray-200 rounded-full" />
          </div>
        </div>
        <div className="p-4 sm:p-6 flex flex-col flex-grow">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
          <div className="space-y-2 mb-4 flex-grow">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <div className="w-24 h-4 bg-gray-200 rounded" />
              <div className="w-32 h-4 bg-gray-200 rounded" />
            </div>
            <div className="w-24 h-4 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  };
  
  export const ArticleListSkeleton: React.FC = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {[...Array(6)].map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    );
  };