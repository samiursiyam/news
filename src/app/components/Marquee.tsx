import Link from 'next/link';
import MarqueeText from 'react-marquee-text';

import "react-marquee-text/dist/styles.css"

interface Healine{
    id : string,
    title : string
}


const Marquee = async() => {

    const rse = await fetch('https://news-api-v2.vercel.app/api/news?limit=10')
    const data = await rse.json()
const headData :Healine[]  = data.data ;
    
    return (
        <div className='bg-red-700 text-white font-semibold w-full overflow-hidden'>

           <div className='flex container mx-auto items-center'> 
            <div className='bg-red-800 py-1 font-bold px-3 sm:px-5 text-sm sm:text-lg md:text-xl whitespace-nowrap shrink-0'>
                সর্বশেষ
            </div>

            <div className='flex-1 min-w-0 overflow-hidden'>
                <MarqueeText direction="right" duration={15} className='py-1 text-sm sm:text-lg md:text-xl'>
                {
                    headData.map((h)=> 
                        <Link href={`/news/${h.id}`} key={h.id}> 
                            <span> {h.title} </span>  
                            <span className='ml-3 sm:ml-5 mr-1 sm:mr-2'>✦</span>
                        </Link>
                    )
                }
                </MarqueeText>
            </div>
             </div>
        </div>
    );
};
export default Marquee;