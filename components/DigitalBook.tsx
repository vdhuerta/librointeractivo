import React, { useRef, useState, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import type { IFlipSetting } from 'react-pageflip';
import { PageData } from '../types';
import Page from './Page';

interface DigitalBookProps {
    pages: PageData[];
    onGenerateClick: () => void;
}

const ChevronLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m15 18-6-6 6-6"/></svg>
);

const ChevronRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>
);

const DigitalBook: React.FC<DigitalBookProps> = ({ pages, onGenerateClick }) => {
    const bookRef = useRef<any>(null);
    const [currentPage, setCurrentPage] = useState(0);

    const onPage = useCallback((e: any) => {
        setCurrentPage(e.data);
    }, []);

    const handleNextPage = () => {
        if (bookRef.current) {
            bookRef.current.pageFlip().flipNext();
        }
    };

    const handlePrevPage = () => {
        if (bookRef.current) {
            bookRef.current.pageFlip().flipPrev();
        }
    };
    
    const pageFlipSettings: IFlipSetting = {
        width: 500,
        height: 700,
        size: 'stretch',
        minWidth: 300,
        maxWidth: 1000,
        minHeight: 420,
        maxHeight: 1400,
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: true,
    };

    return (
        <div className="relative w-full max-w-[1050px] flex items-center justify-center">
            <button
                onClick={handlePrevPage}
                className="absolute left-0 z-10 p-2 bg-white/50 dark:bg-black/50 rounded-full shadow-lg hover:bg-white dark:hover:bg-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed transform -translate-x-1/2"
                disabled={currentPage === 0}
                aria-label="Previous Page"
            >
                <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            </button>

            <HTMLFlipBook {...pageFlipSettings} ref={bookRef} onFlip={onPage} className="shadow-2xl">
                {pages.map((page, index) => (
                    <Page key={page.id} pageData={page} pageNumber={index + 1} totalPages={pages.length} />
                ))}
            </HTMLFlipBook>
            
            <div 
                className="absolute top-0 left-1/2 h-full w-px bg-black/10 dark:bg-white/10 pointer-events-none z-10"
                style={{ transform: 'translateX(-0.5px)' }}
                aria-hidden="true"
            ></div>
            
            <button 
                onClick={onGenerateClick}
                className="absolute top-4 right-4 z-20 px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-md"
                title="Crear un nuevo set de ilustraciones para el libro"
            >
                Generar Ilustraciones
            </button>

            <button
                onClick={handleNextPage}
                className="absolute right-0 z-10 p-2 bg-white/50 dark:bg-black/50 rounded-full shadow-lg hover:bg-white dark:hover:bg-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed transform translate-x-1/2"
                disabled={currentPage >= pages.length - 1}
                aria-label="Next Page"
            >
                <ChevronRight className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            </button>
        </div>
    );
};

export default DigitalBook;