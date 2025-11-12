import React, { useState, useEffect } from 'react';
import { INITIAL_PAGES, BOOK_TITLE } from './constants';
import { PageData } from './types';
import { generateImageForPage } from './services/geminiService';
import DigitalBook from './components/DigitalBook';

const LOCAL_STORAGE_KEY = 'elena_storybook_pages';

interface LoadingSpinnerProps {
    progress: number;
    total: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ progress, total }) => (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-serif">Creando las ilustraciones...</p>
        <p className="mt-2 text-sm text-gray-500">
             {progress > 0 
                ? `Generando ilustración ${progress} de ${total}` 
                : 'Un momento, la magia está en proceso.'}
        </p>
    </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-red-700 p-4">
        <h2 className="text-2xl font-bold font-serif mb-4">¡Oh no! Algo salió mal.</h2>
        <p className="text-center">{message}</p>
        <p className="mt-4 text-sm">Por favor, refresca la página para intentarlo de nuevo.</p>
    </div>
);

const App: React.FC = () => {
    const [pages, setPages] = useState<PageData[]>(INITIAL_PAGES);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        try {
            const storedPages = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (storedPages) {
                const parsedPages: PageData[] = JSON.parse(storedPages);
                // Basic validation to ensure stored data is not empty or malformed
                if (parsedPages && parsedPages.length === INITIAL_PAGES.length) {
                    setPages(parsedPages);
                } else {
                    // Clear outdated data if structure has changed
                    localStorage.removeItem(LOCAL_STORAGE_KEY);
                }
            }
        } catch (e) {
            console.error("Failed to parse pages from localStorage", e);
            // Clear corrupted data
            localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
    }, []);

    const handleGenerateImages = async () => {
        setIsLoading(true);
        setError(null);
        setProgress(0);
        
        // Always start from the pristine INITIAL_PAGES data to ensure consistency.
        const pagesToGenerate = INITIAL_PAGES.filter(p => p.prompt);
        const totalToGenerate = pagesToGenerate.length;
        
        // Use a temporary array based on initial data to accumulate results.
        let generatedPages = [...INITIAL_PAGES];
        // Set state to show placeholders immediately.
        setPages(generatedPages);

        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        
        try {
            for (let i = 0; i < totalToGenerate; i++) {
                const pageToUpdate = pagesToGenerate[i];
                const imageUrl = await generateImageForPage(pageToUpdate.prompt!);
                
                const pageIndex = generatedPages.findIndex(p => p.id === pageToUpdate.id);
                if (pageIndex !== -1) {
                    generatedPages[pageIndex] = { ...generatedPages[pageIndex], imageUrl };
                    // Update state for real-time progress display
                    setPages([...generatedPages]);
                }
                
                setProgress(i + 1);
                
                if (i < totalToGenerate - 1) {
                    await sleep(5000);
                }
            }

            // Once all images are generated successfully, save to localStorage
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(generatedPages));

        } catch (err)
 {
            console.error("Failed to generate images:", err);
            setError(err instanceof Error ? err.message : "An unknown error occurred during image generation.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleGenerateClick = () => {
        if (window.confirm("¿Estás seguro de que quieres generar todas las ilustraciones? Las actuales se perderán si existen.")) {
            handleGenerateImages();
        }
    }

    const pagesWithPromptsCount = pages.filter(p => p.prompt).length;

    if (isLoading) {
        return <LoadingSpinner progress={progress} total={pagesWithPromptsCount} />;
    }

    if (error) {
        return <ErrorDisplay message={error} />;
    }
    
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-serif">
            <header className="mb-4 md:mb-8 text-center relative w-full max-w-4xl">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">{BOOK_TITLE}</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Una novela de misterio interactiva</p>
            </header>
            <main className="w-full flex-grow flex items-center justify-center">
                <DigitalBook pages={pages} onGenerateClick={handleGenerateClick} />
            </main>
        </div>
    );
};

export default App;