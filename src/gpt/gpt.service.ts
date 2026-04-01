import { Injectable, NotFoundException } from '@nestjs/common';
import { audioToTextUseCase, imageGenerationUseCase, imageVariationUseCase, orthographyCheckUseCase, prosConsDicusserStreamUseCase, prosConsDicusserUseCase, textToAudioUseCase, translateUseCase } from './use-cases';
import { AudioToTextDto, ImageGenerationDto, ImageVariationDto, OrthographyDto, ProsConsDiscusserDto, TextToAudioDto, TranslateDto } from './dtos';
import OpenAI from 'openai';
import * as path from 'path';
import * as fs from 'fs';

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

    async textToAudio({ prompt, voice }: TextToAudioDto) {
        return await textToAudioUseCase(this.openAI, {
            prompt,
            voice,
        });
    }

    async textToAudioGetter(fileId: string) {
        const filePath = path.resolve(__dirname, '../../generated/audios/', `${fileId}.mp3`);

        const fileExists = fs.existsSync(filePath);
        if (!fileExists) {
            throw new NotFoundException(`Audio ${fileId} not found`);
        }
        return filePath;
    }

    async audioToText(audioFile: Express.Multer.File, audioToTextDto: AudioToTextDto) {
        return await audioToTextUseCase(this.openAI, {
            audioFile,
            prompt: audioToTextDto.prompt,
        });
    }

    async imageGeneration(imageGenerationDto: ImageGenerationDto) {
        return await imageGenerationUseCase(this.openAI, { ...imageGenerationDto });
    }

    async getGeneratedImage(fileName: string) {
        const filePath = path.resolve(__dirname, '../../generated/images/', fileName);

        const fileExists = fs.existsSync(filePath);
        if (!fileExists) {
            throw new NotFoundException(`Image ${fileName} not found`);
        }
        return filePath;
    }

    async generateImageVariation({ baseImage }: ImageVariationDto) {
        return await imageVariationUseCase(this.openAI, {
            baseImage,
        });
    }

}
