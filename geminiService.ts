
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateBotSpec = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are Viper AI, a high-performance Discord bot architect. 
        Analyze the user's request and provide an immediate, optimized JSON response detailing:
        1. A professional bot name.
        2. A technical and concise description.
        3. A list of 5 essential slash commands.
        4. A suggested set of high-tier features.
        
        Output MUST be valid JSON. No conversational filler.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            botName: { type: Type.STRING },
            description: { type: Type.STRING },
            commands: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            features: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["botName", "description", "commands"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
