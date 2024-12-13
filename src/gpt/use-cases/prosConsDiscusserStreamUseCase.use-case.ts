import { GoogleGenerativeAI } from '@google/generative-ai';

interface Options {
  prompt: string;
}

export const prosConsDiscusserStreamUseCase = async (
  gemmaAi: GoogleGenerativeAI,
  { prompt }: Options,
) => {
  const model = gemmaAi.getGenerativeModel({
    model: 'gemini-1.5-pro',
    systemInstruction: `
            Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
            la respuesta debe de ser en formato markdown,
            los pros y contras deben de estar en una lista,
        `,
    generationConfig: {
      responseMimeType: 'application/json',
      candidateCount: 1,
      maxOutputTokens: 150,
      temperature: 1.0,
    },
  });

  return await model.generateContentStream(prompt);
};
