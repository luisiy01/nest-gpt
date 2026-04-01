import OpenAI from "openai";

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
        response_format: 'url',
    });

    return resp;
}