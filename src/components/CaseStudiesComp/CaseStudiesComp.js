import Image from 'next/image';
import Link from 'next/link';

export default function CaseStudiesComp({ data }) {
    return (
        <>
            <div className='bg-neutral py-20'>
                <div className='container flex flex-col gap-6 '>
                    <h2 className='text-3xl font-bold'>{data?.heading}</h2>
                    <div className='grid grid-cols-4 lg:grid-rows-2 md:grid-rows-4 grid-rows-6 md:h-[880px] h-[1200px] md:gap-10 gap-6 lg:h-[480px]'>
                        {data?.casestudies.map((caseStudy, index) => {
                            return (
                                <>
                                    <Link
                                        href={caseStudy.link}
                                        target='_blank'
                                        key={index}
                                        className={`md:col-span-2 row-span-2 col-span-4 flex flex-col bg-white rounded-lg overflow-hidden hover:shadow-lg ${
                                            index !== 0 && 'lg:hidden'
                                        }`}
                                    >
                                        <div
                                            className='flex-grow flex items-center justify-center'
                                            style={{
                                                backgroundImage: `url(${caseStudy.img})`,
                                                backgroundPosition: 'center center',
                                                backgroundSize: 'cover',
                                            }}
                                        >
                                            <Image
                                                height={600}
                                                width={600}
                                                className='h-[60px] w-auto'
                                                src={caseStudy.logo}
                                                alt={`Logo of ${caseStudy.description}`}
                                            />
                                        </div>
                                        <div className='l:p-8 md:p-6 p-4 flex flex-col gap-2'>
                                            <p className='text-xl'>{caseStudy.description}</p>
                                            <span className='mt-auto'>{caseStudy.linkText}</span>
                                        </div>
                                    </Link>
                                    <Link
                                        href={caseStudy.link}
                                        target='_blank'
                                        key={index}
                                        className={`col-span-2 row-span-1 hidden  bg-white rounded-lg overflow-hidden hover:shadow-lg ${
                                            index !== 0 && 'lg:flex'
                                        }`}
                                    >
                                        <div
                                            className='flex items-center justify-center w-1/3 aspect-square'
                                            style={{
                                                backgroundImage: `url(${caseStudy.img})`,
                                                backgroundPosition: 'center center',
                                                backgroundSize: 'cover',
                                            }}
                                        >
                                            <Image
                                                height={600}
                                                width={600}
                                                className='h-[60px] w-auto'
                                                src={caseStudy.logo}
                                                alt={`Logo of ${caseStudy.description}`}
                                            />
                                        </div>
                                        <div className='p-8 flex flex-col gap-2 w-2/3'>
                                            <p className='text-xl'>{caseStudy.description}</p>
                                            <span className='mt-auto'>{caseStudy.linkText}</span>
                                        </div>
                                    </Link>
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
