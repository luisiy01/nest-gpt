import OpenAI from "openai";
import * as fs from 'node:fs';

interface Options {
    prompt?: string;
    audioFile: Express.Multer.File;
}

export const audioToTextUseCase = async (openai: OpenAI, options: Options) => {
    const { prompt, audioFile } = options;

    const resp = await openai.audio.transcriptions.create({
        model: 'whisper-1',
        file: fs.createReadStream(audioFile.path),
        prompt: prompt, // mismo idioma del audio
        language: 'es',
        response_format: 'verbose_json',
    });

    console.log(resp)
    return resp;
}