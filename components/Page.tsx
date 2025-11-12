import React from 'react';
import { PageData } from '../types';

interface PageProps {
    pageData: PageData;
    pageNumber: number;
    totalPages: number;
}

const ImageLoader: React.FC = () => (
    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
        <svg className="w-10 h-10 text-gray-400 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
    </div>
);

const Page: React.FC<PageProps> = React.forwardRef<HTMLDivElement, PageProps>(({ pageData, pageNumber, totalPages }, ref) => {
    
    switch (pageData.type) {
        case 'cover':
            return (
                <div 
                    ref={ref}
                    className="bg-stone-900 text-white relative"
                    data-density="hard"
                >
                    {pageData.imageUrl ? (
                        <img 
                            src={pageData.imageUrl} 
                            alt="Book Cover" 
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0">
                            <ImageLoader />
                        </div>
                    )}
                </div>
            );

        case 'image':
            return (
                <div ref={ref} className="bg-stone-200 dark:bg-stone-900">
                    {pageData.imageUrl ? (
                        <img 
                            src={pageData.imageUrl} 
                            alt={`Ilustración de la historia`} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full">
                            <ImageLoader />
                        </div>
                    )}
                </div>
            );

        case 'text':
            return (
                <div 
                    ref={ref}
                    className="bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 p-8 md:p-10 flex flex-col h-full"
                    data-density='soft'
                >
                    <main className="flex-grow">
                        <div className="text-justify leading-relaxed text-lg">
                            {pageData.text}
                        </div>
                    </main>

                    <footer className="text-right text-sm text-stone-500 dark:text-stone-400 pt-4 mt-auto">
                        <p>{pageNumber} / {totalPages}</p>
                    </footer>
                </div>
            );
        
        case 'chapter':
            return (
                <div 
                    ref={ref}
                    className="bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 h-full relative"
                    data-density="hard"
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-10">
                        <main className="text-center">
                            <p className="text-lg text-stone-500 dark:text-stone-400 font-serif tracking-widest mb-2">
                                {pageData.chapterInfo?.number}
                            </p>
                            <h1 className="text-4xl md:text-5xl font-bold font-serif">
                                {pageData.chapterInfo?.title}
                            </h1>
                            {pageData.chapterInfo?.synopsis && (
                                <p className="mt-8 text-lg italic text-stone-600 dark:text-stone-300 max-w-md">
                                    &ldquo;{pageData.chapterInfo.synopsis}&rdquo;
                                </p>
                            )}
                        </main>
                    </div>

                    <footer className="absolute bottom-10 right-10 text-sm text-stone-500 dark:text-stone-400">
                        <p>{pageNumber} / {totalPages}</p>
                    </footer>
                </div>
            );

        case 'blank':
            return (
                <div 
                    ref={ref}
                    className="bg-stone-100 dark:bg-stone-800"
                />
            );
            
        default:
            return <div ref={ref} className="bg-red-200"><p>Página desconocida</p></div>;
    }
});

Page.displayName = 'Page';

export default Page;
