import { Configuration, OpenAIApi } from "openai";
import { createReadStream } from "fs";
import "dotenv/config";

class OpenAI {
    constructor(apiKey) {
        const configuration = new Configuration({
            apiKey
        });

        this.openai = new OpenAIApi(configuration);
    }

    mp3ToText = async (mp3Path) => {
        try {
            const response = await this.openai.createTranscription(
                createReadStream(mp3Path),
                "whisper-1"
            );

            return response.data.text;

        } catch (error) {
            console.log(`[ERROR] Error while convert mp3 to text: ${error.message}`)
        }
    };

    reply = async (text) => {
        try {
            const response = await this.openai.createChatCompletion(text);
        } catch (error) {
            
        }
    }; 
};

export const openai = new OpenAI(process.env.OPENAI_API_KEY);