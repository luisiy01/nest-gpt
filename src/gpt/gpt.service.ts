import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase, prosConsDicusserStreamUseCase, prosConsDicusserUseCase, translateUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto, TranslateDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {

    private openAI = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    async orthographyCheck(orthographyDto: OrthographyDto) {
        return await orthographyCheckUseCase(this.openAI, {
            prompt: orthographyDto.prompt,
        });
    }

    async prosConsDicusser(prosConsDiscusserDto: ProsConsDiscusserDto) {
        return await prosConsDicusserUseCase(this.openAI, {
            prompt: prosConsDiscusserDto.prompt,
        });
    }

    async prosConsDicusserStream(prosConsDiscusserDto: ProsConsDiscusserDto) {
        return await prosConsDicusserStreamUseCase(this.openAI, {
            prompt: prosConsDiscusserDto.prompt,
        });
    }

    async translateText({ prompt, lan }: TranslateDto) {
        return await translateUseCase(this.openAI, {
            prompt,
            lan,
        });
    }

}
