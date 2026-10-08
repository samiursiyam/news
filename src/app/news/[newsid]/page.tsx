import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';

/* ============================ Types ============================ */
type DescriptionBlock = {
  model?: {
    blocks?: Array<{
      model?: {
        text?: string;
      };
    }>;
  };
};

type ArticleDescription = {
  blocks?: DescriptionBlock[];
};

type BodyBlock =
  | {
      type: 'image';
      url: string;
      width: number;
      height: number;
      caption?: string;
      altText?: string;
      copyrightHolder?: string;
    }
  | { type: 'text'; text: string }
  | { type: 'subheading'; text: string };

interface Byline {
  name: string;
  role: string;
}

interface Topic {
  id: string;
  name: string;
}

interface Article {
  id: string;
  title: string;
  description?: string | ArticleDescription;
  link: string;
  firstPublished: string;
  lastPublished: string;
  byline?: Byline[];
  topics?: Topic[];
  tags?: string[];
  imageUrl?: string;
  imageAlt?: string;
  category?: string;
  body?: BodyBlock[];
  text?: string;
  wordCount?: number;
  source?: string;
  sourceUrl?: string;
}

interface DetalePageProps {
  params: Promise<{ newsid: string }>;
}

/* ========================== Utilities ========================== */
const bnDate = (iso: string) =>
  new Intl.DateTimeFormat('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));

const getLead = (news: Article): string => {
  const d = news?.description;
  if (!d) return '';
  if (typeof d === 'string') return d;
  return d?.blocks?.[0]?.model?.blocks?.[0]?.model?.text ?? '';
};

/* ======================= Body Renderer ======================== */
const BodyRenderer = ({ blocks }: { blocks: BodyBlock[] }) => {
  const nodes: React.ReactNode[] = [];

  blocks.forEach((block, i) => {
    /* ---------- Image ---------- */
    if (block.type === 'image') {
      nodes.push(
        <figure key={`img-${i}`} className="my-5 sm:my-8 lg:my-10">
          <div className="overflow-hidden rounded-lg bg-gray-100 shadow-sm ring-1 ring-black/5 sm:rounded-xl lg:rounded-2xl">
            <Image
              src={block.url}
              alt={block.altText ?? ''}
              width={block.width}
              height={block.height}
              loading="lazy"
              className="h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

          {(block.caption || block.copyrightHolder) && (
            <figcaption className="mt-2 border-l-2 border-red-600 pl-2.5 sm:mt-3 sm:pl-3">
              {block.caption && (
                <p className="text-[12px] leading-[1.3] text-gray-600 sm:text-[14px] sm:leading-[1.35] lg:text-[15px]">
                  {block.caption}
                </p>
              )}
              {block.copyrightHolder && (
                <p className="mt-1 text-[10px] leading-[1.2] text-gray-400 sm:text-[11px]">
                  ছবি: {block.copyrightHolder}
                </p>
              )}
            </figcaption>
          )}
        </figure>
      );
      return;
    }

    /* ---------- Subheading ---------- */
    if (block.type === 'subheading') {
      nodes.push(
        <h2
          key={`sub-${i}`}
          className="mt-6 mb-2.5 scroll-mt-24 text-lg font-bold leading-[1.15] text-gray-900 sm:mt-8 sm:mb-3 sm:text-2xl lg:mt-10 lg:text-[28px]"
        >
          <span className="mr-2 inline-block h-3.5 w-1 -translate-y-0.5 rounded-full bg-red-600 align-middle sm:h-4 sm:w-1.5 lg:h-5" />
          {block.text}
        </h2>
      );
      return;
    }

    /* ---------- Text (may contain \n) ---------- */
    block.text
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean)
      .forEach((paragraph, j) => {
        nodes.push(
          <p
            key={`p-${i}-${j}`}
            className="mb-2.5 text-[15px] leading-[1.35] text-gray-800 sm:mb-3 sm:text-[16px] sm:leading-[1.4] lg:text-[17px] lg:leading-[1.45]"
          >
            {paragraph}
          </p>
        );
      });
  });

  return <>{nodes}</>;
};

/* ========================= Main Page ========================== */
const DetalePage = async ({ params }: DetalePageProps) => {
  const { newsid } = await params;

  if (!newsid) notFound();

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${encodeURIComponent(newsid)}`,
    { cache: 'no-store' }
  );

  if (!res.ok) notFound();

  const json = await res.json();

  const news: Article | undefined =
    json?.data?.article ?? json?.data ?? json?.article ?? json;

  if (!news || !news.id) notFound();

  const lead = getLead(news);
  const author = news.byline?.[0];

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-[820px] py-4 sm:py-8 lg:py-12">
          {/* ---------- Topics ---------- */}
          {!!news.topics?.length && (
            <div className="mb-3 flex flex-wrap items-center gap-1.5 sm:mb-4 sm:gap-2">
              {news.topics.slice(0, 4).map((t) => (
                <span
                  key={t.id}
                  className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium leading-[1.2] text-red-700 ring-1 ring-red-100 sm:px-2.5 sm:py-1 sm:text-[11px] lg:text-xs"
                >
                  {t.name}
                </span>
              ))}
            </div>
          )}

          {/* ---------- Title ---------- */}
          <h1 className="text-[20px] font-bold leading-[1.15] tracking-tight text-gray-900 sm:text-[26px] sm:leading-[1.15] lg:text-[34px] lg:leading-[1.15]">
            {news.title}
          </h1>

          {/* ---------- Lead ---------- */}
          {lead && (
            <p className="mt-3 border-l-4 border-red-600 pl-3 text-[15px] font-medium leading-[1.4] text-gray-600 sm:mt-5 sm:pl-4 sm:text-base sm:leading-[1.4] lg:mt-6 lg:text-lg lg:leading-[1.4]">
              {lead}
            </p>
          )}

          {/* ---------- Byline (Avatar ছাড়া) ---------- */}
          <div className="mt-5 flex flex-col gap-2 border-y border-gray-200 py-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:py-3.5 lg:mt-8 lg:py-4">
            {author && (
              <div className="leading-[1.25]">
                <p className="text-[12px] font-semibold text-gray-900 sm:text-[13px] lg:text-sm">
                  {author.name}
                </p>
                <p className="text-[10px] text-gray-500 sm:text-[11px] lg:text-xs">
                  {author.role}
                </p>
              </div>
            )}

            <div className="text-left text-[10px] leading-[1.3] text-gray-500 sm:text-right sm:text-[11px] lg:text-xs">
              <p>
                প্রকাশ:{' '}
                <time dateTime={news.firstPublished} className="text-gray-700">
                  {bnDate(news.firstPublished)}
                </time>
              </p>
              {news.wordCount ? (
                <p className="mt-0.5">
                  পড়ার সময়: ~{Math.ceil(news.wordCount / 200)} মিনিট
                </p>
              ) : null}
            </div>
          </div>

          {/* ---------- Body ---------- */}
          <div className="mt-5 sm:mt-7 lg:mt-8">
            {news.body && news.body.length > 0 ? (
              <BodyRenderer blocks={news.body} />
            ) : news.text ? (
              news.text
                .split('\n')
                .map((p) => p.trim())
                .filter(Boolean)
                .map((paragraph, i) => (
                  <p
                    key={i}
                    className="mb-2.5 text-[15px] leading-[1.35] text-gray-800 sm:mb-3 sm:text-[16px] sm:leading-[1.4] lg:text-[17px] lg:leading-[1.45]"
                  >
                    {paragraph}
                  </p>
                ))
            ) : (
              <p className="text-gray-400">
                এই সংবাদে বিস্তারিত তথ্য পাওয়া যায়নি।
              </p>
            )}
          </div>

          {/* ---------- Tags ---------- */}
          {!!news.tags?.length && (
            <div className="mt-6 border-t border-gray-200 pt-4 sm:mt-10 sm:pt-5 lg:mt-12 lg:pt-6">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider leading-[1.2] text-gray-400 sm:mb-2.5 sm:text-[11px] lg:text-xs">
                ট্যাগ
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {news.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-gray-100 px-2 py-1 text-[10px] font-medium leading-[1.2] text-gray-700 transition hover:bg-gray-200 sm:px-2.5 sm:text-[11px] lg:px-3 lg:py-1.5 lg:text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ---------- Source / Back ---------- */}
          <div className="mt-5 flex flex-col gap-3 rounded-xl bg-gray-50 p-3.5 ring-1 ring-gray-100 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:rounded-2xl sm:p-4 lg:mt-8 lg:p-5">
            <div>
              <p className="text-[10px] leading-[1.2] text-gray-500 sm:text-[11px] lg:text-xs">
                সূত্র
              </p>
              <p className="text-[12px] font-semibold leading-[1.2] text-gray-900 sm:text-[13px] lg:text-sm">
                {news.source ?? 'BBC Bangla'}
              </p>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
              <Link
                href="/"
                className="rounded-full border border-gray-300 px-4 py-2 text-center text-[12px] font-semibold leading-[1.2] text-gray-700 transition hover:bg-gray-100 sm:px-5 sm:py-2.5 sm:text-[13px] lg:text-sm"
              >
                ← ফিরে যান
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};

export default DetalePage;