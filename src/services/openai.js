import { Configuration, OpenAIApi } from "openai";
import "dotenv/config";

class OpenAI {
    constructor(apiKey) {
        const configuration = new Configuration({
            apiKey
        });

        this.openai = new OpenAIApi(configuration);
    };

    reply = async (text) => {
        try {
            const response = await this.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{
                    "role": "user",
                    "content": text
                }]
            });

            return response.data.choices[0].message.content;

        } catch (error) {
            console.log(`[ERROR] Error while reply on user request: ${error.message}`);
        }
    }; 
};

export const openai = new OpenAI(process.env.OPENAI_API_KEY);