import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ArticleCard } from "./ArticleCard";
import { Article } from "../types/news";
import { ArticleListSkeleton } from "./ArticleCardSkeleton";

const NewsList: React.FC = () => {
  const { articles, isLoading } = useSelector((state: RootState) => state.news);

  if (isLoading) {
    return (
      <ArticleListSkeleton />
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No articles found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-2">
      {articles.map((article: Article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default NewsList;
