import { GoogleGenerativeAI } from '@google/generative-ai';

interface Options {
  prompt: string;
  maxOutputTokens?: number;
}

export const orthographyCheckUseCase = async (
  gemmaAi: GoogleGenerativeAI,
  { prompt, maxOutputTokens }: Options,
) => {
  const model = gemmaAi.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: `
      Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
      tu tarea es corregirlos y retornar información soluciones,
      también debes de dar un porcentaje de acierto por el usuario,

      Si no hay errores, debes de retornar un mensaje de felicitaciones.

      Ejemplo de salida:
      {
        userScore: number,
        errors: string[], // ['error' -> solución]
        message: string // Usa emojis en la felicitación
      }
    `,
    generationConfig: {
      responseMimeType: 'application/json',
      candidateCount: 1,
      // stopSequences: ['x'],
      // maxOutputTokens: maxOutputTokens,
      temperature: 1.0,
    },
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
};
