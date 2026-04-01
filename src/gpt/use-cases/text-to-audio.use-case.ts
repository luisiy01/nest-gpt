import OpenAI from "openai";

interface Options {
    prompt: string;
    voice?: string;
}

export const textToAudioUseCase = async (openAI: OpenAI, { prompt, voice }: Options) => {

    const voices = {
        alloy: 'alloy',
        echo: 'echo',
        fable: 'fable',
        onyx: 'onyx',
        nova: 'nova',
        shimmer: 'shimmer',
    }

    let selectedVoice = 'nova'
    if (voice !== undefined) {
        selectedVoice = voices[voice] ?? 'nova';
    }



    return {
        prompt,
        selectedVoice
    };
}