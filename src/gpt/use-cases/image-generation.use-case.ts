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
        quality: 'standard',
        response_format: 'url',
    });

    console.log(resp)

    if (!resp.data || !resp.data[0]) {
        throw new Error('No image was generated');
    }

    return {
        url: resp.data[0].url,
        localPath: '',
        revised_prompt: resp.data[0].revised_prompt,
    }
}