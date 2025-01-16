import React from 'react';
import { Newspaper } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 px-4 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Newspaper className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">NewsHub</h1>
        </div>
      </div>
    </header>
  );
};