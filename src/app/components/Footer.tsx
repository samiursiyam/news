import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  const categories = [
    { label: 'হোম', href: '/' },
    { label: 'রাজনীতি', href: '/category/politics' },
    { label: 'বিশ্ব', href: '/category/world' },
    { label: 'অর্থনীতি', href: '/category/economy' },
    { label: 'স্বাস্থ্য', href: '/category/health' },
    { label: 'খেলা', href: '/category/sports' },
    { label: 'প্রযুক্তি', href: '/category/technology' },
  ];

  const socials = [
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      path: 'M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z',
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.84-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z',
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/8801000000000',
      path: 'M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.78 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02ZM12.04 20.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.86.85-.86 2.06 0 1.22.88 2.39 1 2.56.12.16 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.51.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.18-.48-.31Z',
    },
  ];

  return (
    <footer className="mt-12 border-t border-gray-200 bg-gradient-to-b from-white to-gray-50 sm:mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[820px] py-8 sm:py-10 lg:py-12">
          {/* ---------- Logo + Tagline ---------- */}
          <div className="flex flex-col items-center text-center">
            <Link
              href="/"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-700 text-lg font-bold text-white shadow-md transition hover:scale-105 sm:h-12 sm:w-12 sm:text-xl"
            >
              সং
            </Link>

            <Link
              href="/"
              className="mt-3 text-xl font-bold tracking-tight text-gray-900 transition hover:text-red-600 sm:mt-4 sm:text-2xl"
            >
              সংবাদ
            </Link>

            <p className="mt-2 max-w-md text-[13px] leading-[1.5] text-gray-500 sm:text-sm">
              বাংলা ভাষায় নির্ভরযোগ্য সংবাদ, বিশ্লেষণ ও মতামত — সত্যের সন্ধানে সবসময়।
            </p>
          </div>

          {/* ---------- Divider ---------- */}
          <div className="my-6 flex w-full items-center gap-3 sm:my-7">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>

          {/* ---------- Categories ---------- */}
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 sm:gap-x-5 sm:gap-y-3">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group relative text-[13px] font-medium leading-[1.2] text-gray-700 transition-colors hover:text-red-600 sm:text-sm"
              >
                {cat.label}
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-red-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* ---------- Social Icons ---------- */}
          <div className="mt-6 flex items-center justify-center gap-3 sm:mt-7">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-br hover:from-red-500 hover:to-red-700 hover:text-white hover:shadow-md sm:h-11 sm:w-11"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 sm:h-[22px] sm:w-[22px]"
                >
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>

          {/* ---------- Copyright ---------- */}
          <div className="mt-7 flex flex-col items-center gap-1.5 border-t border-gray-200 pt-5 text-center sm:mt-8 sm:pt-6">
            <p className="text-[11px] leading-[1.4] text-gray-500 sm:text-xs">
              © {year} সংবাদ — সর্বস্বত্ব সংরক্ষিত।
            </p>
            <p className="text-[11px] leading-[1.4] text-gray-400 sm:text-xs">
              Made with <span className="text-red-500">♥</span> in Bangladesh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;