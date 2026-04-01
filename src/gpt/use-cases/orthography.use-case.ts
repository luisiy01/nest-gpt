interface Options {
    prompt: string;
}

export const orthographyCheckUseCase = (options: Options) => {


    const { prompt } = options;

    return { prompt: prompt };
}