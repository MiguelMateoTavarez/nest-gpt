import { Injectable } from '@nestjs/common';
import {
  orthographyCheckUseCase,
  prosConsDiscusserStreamUseCase,
  prosConsDiscusserUseCase,
} from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GptService {
  private gemmaAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.gemmaAi, {
      prompt: orthographyDto.prompt,
      maxOutputTokens: orthographyDto.max_tokens,
    });
  }

  async prosConsDiscusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.gemmaAi, { prompt });
  }

  async prosConsDiscusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserStreamUseCase(this.gemmaAi, { prompt });
  }
}
