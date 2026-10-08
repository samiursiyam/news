import NewsCard from "@/app/components/NewsCard";
import React from "react";
import { notFound } from "next/navigation";

// ---------- Types ----------
interface News {
  _id?: string;
  title: string;
  description?: string;
  image_url?: string;
  author?: string;
  published_at?: string;
  category_id?: string | number;
  details?: string;
  total_view?: number;
  rating?: {
    number: number;
    badge: string;
  };
  [key: string]: unknown;
}

interface CategoryApiResponse {
  title: string;
  data: News[];
}

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

// ---------- Page ----------
const CatagoreId = async ({ params }: CategoryPageProps) => {
  const { id } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return notFound();

  const data: CategoryApiResponse = await res.json();
  const containernews: News[] = data?.data ?? [];

  return (
    <section className="container mx-auto my-8 px-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="h-8 w-1.5 rounded-full bg-red-700" />
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight">
          {data.title}
        </h1>
        <span className="ml-auto text-sm text-gray-500">
          {containernews.length} articles
        </span>
      </div>

      {/* Grid */}
      {containernews.length === 0 ? (
        <p className="text-center text-gray-500 py-16">
          No news available in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {containernews.map((news, ind) => (
            <NewsCard key={news._id ?? ind} news ={news} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CatagoreId;