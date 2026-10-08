// components/Mostread.tsx
import React from 'react';
import Link from 'next/link';

interface News {
  id: string;
  title: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  imageAlt?: string;
}

const Mostread = async () => {
  const res = await fetch(
    'https://news-api-v2.vercel.app/api/news/most-read',
    { cache: 'no-store' }
  );
  const data = await res.json();
  const news: News[] = data?.data ?? [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
      {/* ===== Header ===== */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
        <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
        <h2 className="text-lg md:text-xl font-bold text-gray-900 uppercase tracking-wide">
          সর্বাধিক পঠিত
        </h2>
      </div>

      {/* ===== News List ===== */}
      <ol className="flex flex-col divide-y divide-gray-100">
        {news.map((n, i) => (
          <li key={n.id}>
            <Link
              href={`/news/${n.id}`}
              className="group flex items-start gap-3 py-4 cursor-pointer transition-colors hover:bg-red-50/40 rounded-lg px-2 -mx-2"
            >
              {/* Serial Number */}
              <span className="flex-shrink-0 w-8 text-center text-xl md:text-2xl font-extrabold text-red-600 group-hover:text-red-700 transition-colors">
                {i + 1}
              </span>

              {/* Title */}
              <h3 className="font-semibold text-sm md:text-base text-gray-800 leading-snug group-hover:text-red-700 transition-colors line-clamp-2">
                {n.title}
              </h3>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Mostread;