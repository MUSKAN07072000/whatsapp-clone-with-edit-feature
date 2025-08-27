
import { GoogleGenAI } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

// Ensure the API_KEY is available in the environment variables
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY for Gemini is not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateTextStatus = async (prompt: string): Promise<string> => {
    if (!API_KEY) return "AI is not configured.";
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a short, witty, or inspirational status update based on the following prompt. Keep it under 100 characters. Prompt: "${prompt}"`,
            config: {
                thinkingConfig: { thinkingBudget: 0 },
                maxOutputTokens: 50,
            }
        });
        return response.text.trim().replace(/"/g, ''); // Clean up quotes
    } catch (error) {
        console.error("Error generating text status:", error);
        return "Failed to generate text. Please try again.";
    }
};

export const generateImageStatus = async (prompt: string): Promise<string | null> => {
    if (!API_KEY) return null;
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: `A vibrant, high-quality photograph for a social media story. Prompt: "${prompt}"`,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '9:16',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        }
        return null;
    } catch (error) {
        console.error("Error generating image status:", error);
        return null;
    }
};
