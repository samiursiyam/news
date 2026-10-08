import Image from "next/image";
import Link from "next/link";
import React from "react";

// ---------- Types ----------
export interface News {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  details?: string;
  category?: string;
  category_id?: string | number;
  imageUrl?: string;
  image_url?: string;
  imageAlt?: string;
  author?: string;
  source?: string;
  type?: string;
  isLive?: boolean;
  link?: string;
  firstPublished?: string;
  lastPublished?: string;
  published_at?: string;
  total_view?: number;
  rating?: {
    number: number;
    badge: string;
  };
}

interface NewsCardProps {
  news: News;
  priority?: boolean;
  className?: string;
}

// ---------- Bengali Date Helper ----------
const formatBengaliDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// ---------- Component ----------
const NewsCard = ({ news, priority = false, className = "" }: NewsCardProps) => {
  const imageSrc = news.imageUrl || news.image_url || "/placeholder.png";
  const altText = news.imageAlt || news.title;

  const publishDate = news.firstPublished || news.lastPublished || news.published_at;
  const bengaliDate = formatBengaliDate(publishDate);

  return (
   <Link href={`/news/${news.id}`}>
    <article
      className={`group relative bg-white overflow-hidden border border-gray-100 
      shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-red-300 
      transition-all duration-300 flex flex-col cursor-pointer ${className}`}
    >
      {/* ===== Image ===== */}
      <figure className="relative w-full h-48 md:h-56 overflow-hidden bg-gray-100">
        <Image
          src={imageSrc}
          alt={altText}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating badge */}
        {news.rating?.badge && (
          <span className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-[10px] 
            font-bold px-2 py-1 shadow-md">
            ⭐ {news.rating.badge}
          </span>
        )}
      </figure>

      {/* ===== Body ===== */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title — Full text */}
        <h2 className="text-lg md:text-xl font-bold text-gray-900 leading-snug mb-2 
          group-hover:text-red-600 transition-colors">
          {news.title}
        </h2>

        {/* Description — ✅ Clamped to 3 lines */}
        {news.description && (
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow">
            {news.description}
          </p>
        )}

        {/* Meta row — Source + Bengali Date */}
        {(news.source || news.author || bengaliDate) && (
          <div className="flex items-center justify-between mt-4 pt-3 
            border-t border-gray-100 text-xs text-gray-500">
            {(news.source || news.author) && (
              <span className="flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                {news.source || news.author}
              </span>
            )}
            {bengaliDate && (
              <time dateTime={publishDate} className="text-gray-500">
                {bengaliDate}
              </time>
            )}
          </div>
        )}
      </div>

      {/* Bottom accent bar on hover */}
      <span className="absolute bottom-0 left-0 h-1 w-0 bg-red-700 
        group-hover:w-full transition-all duration-500" />
    </article>
   </Link>
  );
};

export default NewsCard;