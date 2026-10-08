import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NewsItem {
  id: string | number;
  imageUrl: string;
  imageAlt: string;
  category: string;
  title: string;
  description: string;
}

interface MainNewsProps {
  news: NewsItem[];
}

const MainNews: React.FC<MainNewsProps> = ({ news }) => {
  if (!news || news.length === 0) return null;

  const [firstNews, ...otherNews] = news;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* ===== Main Feature News ===== */}
      <Link href={`/news/${firstNews.id}`}>
        <article className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
          <figure className="relative overflow-hidden">
            <Image
              src={firstNews.imageUrl}
              alt={firstNews.imageAlt}
              width={600}
              height={400}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow">
              {firstNews.category}
            </span>
          </figure>

          <div className="p-5">
            <h2 className="text-xl font-bold text-gray-900 leading-snug mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
              {firstNews.title}
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {firstNews.description}
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              <span>Breaking News</span>
            </div>
          </div>
        </article>
      </Link>

      {/* ===== Other News List ===== */}
      <div className="grid gap-3">
        {otherNews.slice(0, 4).map((on) => (
          <Link
            href={`/news/${on.id}`}
            key={on.id}
            className="group card bg-white border border-gray-100 rounded-xl p-4 hover:border-red-300 hover:shadow-md hover:bg-red-50/30 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1 h-4 bg-red-600 rounded-full"></span>
              <p className="text-red-600 text-xs font-bold uppercase tracking-wide">
                {on.category}
              </p>
            </div>

            <h3 className="font-semibold text-gray-800 leading-snug text-sm group-hover:text-red-700 transition-colors line-clamp-2">
              {on.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainNews;