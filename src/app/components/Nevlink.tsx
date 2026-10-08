import Link from 'next/link';
import React from 'react';

interface Nevs{
    "slug": string,
      "title": string,
      "topicId": string | null,
      "url": string,
      "scrapable": boolean 
}

const Nevlink = async () => {

    const res = await fetch('https://news-api-v2.vercel.app/api/categories')
    const data = await res.json()

    const nev :Nevs[] = data.data;
    const filternev = nev.filter(n => n.scrapable)
    return (
        <div className='w-full m-3'>
            <div className='flex flex-wrap gap-x-4 gap-y-2 sm:gap-5 justify-center items-center font-bold text-sm sm:text-base md:text-lg px-2'>
                <Link href={'/'} className='hover:text-red-700 whitespace-nowrap'>হোম</Link>
                {
                    filternev.map((n , ind) => 
                        <Link 
                            key={ind} 
                            href={`/catogory/${n.slug}`} 
                            className='hover:text-red-700 whitespace-nowrap'
                        > 
                            {n.title}
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default Nevlink;