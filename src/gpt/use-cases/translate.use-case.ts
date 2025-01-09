import { GoogleGenerativeAI } from '@google/generative-ai';

interface Options {
  prompt: string;
  lang: string;
  maxOutputTokens?: number;
}

export const translateUseCase = async (
  gemmaAi: GoogleGenerativeAI,
  { prompt, lang, maxOutputTokens }: Options,
) => {
  const model = gemmaAi.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: `
      Traduce el siguiente texto al idioma ${lang}:${prompt}

      Ejemplo de salida:
      {
        origin: string, // Texto original
        message: string // Resultado de la traducción
      }
    `,
    generationConfig: {
      responseMimeType: 'application/json',
      candidateCount: 1,
      maxOutputTokens: maxOutputTokens,
      temperature: 1.0,
    },
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
};
