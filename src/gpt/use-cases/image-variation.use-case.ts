import OpenAI from "openai";
import { downloadImageAsPng } from "src/helpers";
import * as fs from 'fs';

interface Options {
    baseImage: string;
}

export const imageVariationUseCase = async (openai: OpenAI, options: Options) => {
    const { baseImage } = options;

    const resp = await openai.images.createVariation({
        model: 'dall-e-3',
        image: fs.createReadStream(baseImage),
        n: 1,
        size: '1024x1024',
        response_format: 'url',
    });

    const url = resp.data?.[0]?.url;
    if (!url) {
        throw new Error('No image was generated');
    }

    const fileName = await downloadImageAsPng(url);
    const correctUrl = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;

    return {
        url: correctUrl,
        openAIUrl: resp.data?.[0]?.url,
        revised_prompt: resp.data?.[0]?.revised_prompt,
    };
}