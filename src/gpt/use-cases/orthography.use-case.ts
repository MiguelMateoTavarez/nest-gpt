interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (options: Options) => {
  return {
    prompt: options.prompt,
    apiKey: process.env.OPENAI_API_KEY,
  };
};
