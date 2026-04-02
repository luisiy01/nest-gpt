import OpenAI from "openai";
import { downloadImageAsPng } from "src/helpers";
import * as fs from 'fs';

interface Options {
    baseImage: string;
}

export const imageVariationUseCase = async (openai: OpenAI, options: Options) => {
    const { baseImage } = options;

    const pngImagePath = await downloadImageAsPng(baseImage, true);

    console.log('pngImagePath', pngImagePath)

    const resp = await openai.images.createVariation({
        model: 'dall-e-2',
        image: fs.createReadStream(pngImagePath),
        n: 1,
        size: '1024x1024',
        response_format: 'url',
    });

    const imageUrl = resp.data?.[0]?.url;

    if (!imageUrl) {
        throw new Error('No image URL returned from OpenAI');
    }

    const fileName = await downloadImageAsPng(imageUrl);
    const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;
    return {
        url,
        openAIUrl: imageUrl,
        revised_prompt: resp.data?.[0]?.revised_prompt,
    };
}