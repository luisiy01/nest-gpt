import OpenAI from "openai";
import { downloadBase64ImageAsPng, downloadImageAsPng } from "src/helpers";
import * as fs from 'fs';
import * as path from 'path';

interface Options {
    prompt: string;
    originalImage?: string;
    maskImage?: string;
}

export const imageGenerationUseCase = async (openai: OpenAI, options: Options) => {
    const { prompt, originalImage, maskImage } = options;

    if (!originalImage || !maskImage) {
        const resp = await openai.images.generate({
            model: 'dall-e-3',
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            quality: 'standard',
            response_format: 'url',
        });

        console.log(resp)

        const url = resp.data?.[0]?.url;
        if (!url) {
            throw new Error('No image was generated');
        }

        const fileName = await downloadImageAsPng(url);

        return {
            url: fileName,
            openAIUrl: resp.data?.[0]?.url,
            revised_prompt: resp.data?.[0]?.revised_prompt,
        };
    }

    const pngImagePath = await downloadImageAsPng(originalImage);
    const maskPath = await downloadBase64ImageAsPng(maskImage);

    const resp = await openai.images.edit({
        model: 'dall-e-3',
        image: fs.createReadStream(pngImagePath),
        mask: fs.createReadStream(maskPath),
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        response_format: 'url',
    });

    const url = resp.data?.[0]?.url;
    if (!url) {
        throw new Error('No image was generated');
    }

    const localImagePath = await downloadImageAsPng(url);
    const fileName = path.basename(localImagePath);

    const publicUrl = `localhost:3000/${fileName}`;

    return {
        url: publicUrl,
        openAIUrl: resp.data?.[0]?.url,
        revised_prompt: resp.data?.[0]?.revised_prompt,
    };
}