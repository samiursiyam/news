import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

/* ----------------------------- Types ----------------------------- */
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

interface Article {
  id: string;
  title: string;
  description?: any;
  link: string;
  firstPublished: string;
  lastPublished: string;
  byline?: { name: string; role: string }[];
  topics?: { id: string; name: string }[];
  tags?: string[];
  imageUrl?: string;
  body: BodyBlock[];
  text?: string;
  wordCount?: number;
  source?: string;
  sourceUrl?: string;
}

/* --------------------------- Utilities --------------------------- */
const bnDate = (iso: string) =>
  new Intl.DateTimeFormat('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));

const getLead = (news: Article): string =>
  news?.description?.blocks?.[0]?.model?.blocks?.[0]?.model?.text ?? '';

/* -------------------------- Body Renderer ------------------------ */
const BodyRenderer = ({ blocks }: { blocks: BodyBlock[] }) => {
  const nodes: React.ReactNode[] = [];

  blocks.forEach((block, i) => {
    /* ---------- Image ---------- */
    if (block.type === 'image') {
      nodes.push(
        <figure key={`img-${i}`} className="my-6 sm:my-10">
          <div className="overflow-hidden rounded-xl bg-gray-100 shadow-sm ring-1 ring-black/5 sm:rounded-2xl">
            <img
              src={block.url}
              alt={block.altText ?? ''}
              width={block.width}
              height={block.height}
              loading="lazy"
              className="h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

          {(block.caption || block.copyrightHolder) && (
            <figcaption className="mt-2.5 border-l-2 border-red-600 pl-3 sm:mt-3">
              {block.caption && (
                <p className="text-[13px] leading-5 text-gray-600 sm:text-[15px] sm:leading-6">
                  {block.caption}
                </p>
              )}
              {block.copyrightHolder && (
                <p className="mt-1 text-[11px] leading-4 text-gray-400 sm:text-xs sm:leading-5">
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
          className="mt-8 mb-3 scroll-mt-24 text-xl font-bold leading-tight text-gray-900 sm:mt-12 sm:mb-5 sm:text-[28px]"
        >
          <span className="mr-2 inline-block h-4 w-1 -translate-y-0.5 rounded-full bg-red-600 align-middle sm:h-5 sm:w-1.5" />
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
            className="mb-4 text-[15px] leading-[1.6] text-gray-800 sm:mb-5 sm:text-[17px] sm:leading-[1.7] lg:text-lg lg:leading-[1.8]"
          >
            {paragraph}
          </p>
        );
      });
  });

  return <>{nodes}</>;
};

/* --------------------------- Main Page --------------------------- */
const DetalePage = async ({ params }: { params: { newsid: string } }) => {
  const { newsid } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsid}`,
    { cache: 'no-store' }
  );

  if (!res.ok) notFound();

  const json = await res.json();
  const news: Article = json?.data;

  if (!news) notFound();

  const lead = getLead(news);
  const author = news.byline?.[0];

  return (
    <main className="min-h-screen bg-white">
      {/* ---------- Full width container ---------- */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-[760px] py-6 sm:py-10 lg:py-14">
          {/* ---------- Topics ---------- */}
          {!!news.topics?.length && (
            <div className="mb-4 flex flex-wrap items-center gap-1.5 sm:mb-5 sm:gap-2">
              {news.topics.slice(0, 4).map((t) => (
                <span
                  key={t.id}
                  className="rounded-full bg-red-50 px-2.5 py-0.5 text-[11px] font-medium leading-5 text-red-700 ring-1 ring-red-100 sm:px-3 sm:py-1 sm:text-xs sm:leading-6"
                >
                  {t.name}
                </span>
              ))}
            </div>
          )}

          {/* ---------- Title ---------- */}
          <h1 className="text-[22px] font-bold leading-[1.25] tracking-tight text-gray-900 sm:text-[30px] sm:leading-[1.3] lg:text-[40px] lg:leading-[1.2]">
            {news.title}
          </h1>

          {/* ---------- Lead ---------- */}
          {lead && (
            <p className="mt-4 border-l-4 border-red-600 pl-3 text-base font-medium leading-[1.6] text-gray-600 sm:mt-6 sm:pl-4 sm:text-lg sm:leading-[1.7] lg:text-xl lg:leading-[1.8]">
              {lead}
            </p>
          )}

          {/* ---------- Byline ---------- */}
          <div className="mt-6 flex flex-col gap-3 border-y border-gray-200 py-3.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:py-4">
            {author && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 text-base font-bold text-white shadow-sm sm:h-11 sm:w-11 sm:text-lg">
                  {author.name.trim().charAt(0)}
                </div>
                <div className="leading-tight">
                  <p className="text-[13px] font-semibold text-gray-900 sm:text-sm">
                    {author.name}
                  </p>
                  <p className="text-[11px] text-gray-500 sm:text-xs">
                    {author.role}
                  </p>
                </div>
              </div>
            )}

            <div className="text-left text-[11px] text-gray-500 sm:ml-auto sm:text-right sm:text-xs">
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
          <div className="mt-6 sm:mt-8">
            <BodyRenderer blocks={news.body ?? []} />
          </div>

          {/* ---------- Tags ---------- */}
          {!!news.tags?.length && (
            <div className="mt-8 border-t border-gray-200 pt-5 sm:mt-12 sm:pt-6">
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 sm:mb-3 sm:text-xs">
                ট্যাগ
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {news.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-gray-100 px-2.5 py-1 text-[11px] font-medium leading-5 text-gray-700 transition hover:bg-gray-200 sm:px-3 sm:py-1.5 sm:text-xs sm:leading-6"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ---------- Source ---------- */}
          <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-100 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:p-5">
            <div>
              <p className="text-[11px] leading-5 text-gray-500 sm:text-xs">
                সূত্র
              </p>
              <p className="text-[13px] font-semibold leading-5 text-gray-900 sm:text-sm">
                {news.source ?? 'BBC Bangla'}
              </p>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
            
              <Link
                href="/"
                className="rounded-full border border-gray-300 px-5 py-2.5 text-center text-[13px] font-semibold leading-5 text-gray-700 transition hover:bg-gray-100 sm:text-sm"
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