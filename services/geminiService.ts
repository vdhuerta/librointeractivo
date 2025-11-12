
import { GoogleGenAI, Modality } from "@google/genai";

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

    while (attempt < maxRetries) {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [{ text: promptText }],
                },
                config: {
                    responseModalities: [Modality.IMAGE],
                },
            });

            if (response.candidates && response.candidates.length > 0 && response.candidates[0].content && response.candidates[0].content.parts) {
                for (const part of response.candidates[0].content.parts) {
                    if (part.inlineData) {
                        const base64ImageBytes: string = part.inlineData.data;
                        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
                    }
                }
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