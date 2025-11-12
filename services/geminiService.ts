

import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateImageForPage(promptText: string): Promise<string> {
    const maxRetries = 3;
    let attempt = 0;
    let lastError: Error | null = null;
    
    // Check if the prompt is for the cover to apply a different aspect ratio
    const isCover = promptText.includes('La portada de un libro de misterio');
    const aspectRatio = isCover ? '3:4' : '9:16';

    while (attempt < maxRetries) {
        try {
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: promptText,
                config: {
                  numberOfImages: 1,
                  outputMimeType: 'image/jpeg',
                  aspectRatio: aspectRatio as "1:1" | "3:4" | "4:3" | "9:16" | "16:9",
                },
            });

            if (response.generatedImages && response.generatedImages.length > 0) {
                const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
                return `data:image/jpeg;base64,${base64ImageBytes}`;
            }
            
            throw new Error("No image data found in the API response.");

        } catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));
            console.error(`Error generating image (attempt ${attempt + 1}/${maxRetries}):`, error);
            attempt++;
            if (attempt < maxRetries) {
                const delay = Math.pow(2, attempt) * 5000; // Exponential backoff: 10s, 20s
                console.log(`Retrying in ${delay / 1000} seconds...`);
                await sleep(delay);
            }
        }
    }

    console.error("Error generating image with Gemini after multiple retries:", lastError);
    // If all retries fail, throw a user-friendly error.
    throw new Error(`Failed to generate illustration for the page after ${maxRetries} attempts. The service might be temporarily unavailable. Please try again later.`);
}