import Marquee from "./components/Marquee";
import MainNews from "./components/MainNews";
import NewsCard from "./components/NewsCard";
import Mostread from "./components/Mostread";





interface IOtherSection {
  curationId: string;
  title: string;
  articles: {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string;
  }[];
}

export default async function Home() {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections",
    { next: { revalidate: 60 } }
  );

  const data = await res.json();
  const sections = data.data;
  const mainNews = sections[0].articles;
  const otherSection:IOtherSection[] = sections.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
 

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-2 my-6 px-4">
        {/* News Section */}
        <div className="lg:col-span-2">
          <MainNews news={mainNews} />

          <div className="grid gap-5">
            {otherSection.map((os) => (
              <div className="" key={os.curationId}>
                {/* h2 tag theke grid ke bahire kora hoyeche */}
                <h2 className="font-bold text-xl md:text-2xl my-4 border-b-3 pb-1 border-red-700">
                  {os.title}
                </h2>

                {/* Mobile e 1 column, tablet e 2 column, desktop e 3 column */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-1">
                  {os.articles.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Read Section */}
        <aside className="lg:col-span-1 min-h-[200px]">
          {/* Sidebar content here */}

          <Mostread />
        </aside>
      </div>
    </div>
  );
}