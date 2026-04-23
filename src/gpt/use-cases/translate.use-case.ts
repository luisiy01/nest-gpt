import OpenAI from "openai";

interface Options {
    prompt: string;
    lan: string;
}

export const translateUseCase = async (openai: OpenAI, { prompt, lan }: Options) => {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'system',
                content: `Traduce el siguiente texto al idioma ${lan}: ${prompt}`,
            }
        ],
        temperature: 0.2,
    });

    return { message: response.choices[0].message.content };
}