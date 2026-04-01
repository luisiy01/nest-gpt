import OpenAI from "openai";

interface Options {
    prompt: string;
}

export const orthographyCheckUseCase = async (openAI: OpenAI, options: Options) => {


    const { prompt } = options;


    const completion = await openAI.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "tu nombre es Pedro Camilo, debes de responder amablemente siempre y dar tu nombre",
            },
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    console.log(completion);

    return completion.choices[0];
}