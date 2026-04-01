import OpenAI from "openai";
import { downloadImageAsPng } from "src/helpers";

interface Options {
    prompt: string;
    originalImage?: string;
    maskImage?: string;
}

export const imageGenerationUseCase = async (openai: OpenAI, options: Options) => {
    const { prompt, originalImage, maskImage } = options;

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
        url: url,
        openAIUrl: resp.data?.[0]?.url,
        revised_prompt: resp.data?.[0]?.revised_prompt,
    };
}