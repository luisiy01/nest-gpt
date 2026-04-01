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
                content: `
                Te serán provistos textos en español con posibles errores ortográficos y gramaticales.
                Las palabras usadas deben de existir en el diccionario de la Real Academia Española,
                Debes de responser en formato JSON.
                Tu tarea es corregirlos y devolver el texto corregido,
                tambien debes de dar un procentaje de acierto por el usuario
                
                Si no hay errores, debes de retornar un mensaje de felicitaciones.

                Ejemplo de respuesta:
                {
                    userScore: number,
                    errors: string[], //['error1 -> solucion']
                    message: string, // Usa emojis y texto para feliciatar al usuario
                }
                `,
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.3,
        max_tokens: 150,
        response_format: {
            type: "json_object",
        },
    });

    const jsonResp = JSON.parse(completion.choices[0].message.content || '');

    return jsonResp;
}