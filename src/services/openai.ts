import { Configuration, OpenAIApi } from "openai";
import * as types from "../types/funcs.js";
import "dotenv/config";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export class OpenAI {

    static chatGptReplyOn: types.chatGptReplyOnFunction = async (content) => {
        try {
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{
                    "role": "user",
                    "content": content
                }]
            });

            return response.data.choices[0].message?.content || "Sorry. I can't answer on your request. Try again later!";

        } catch (error) {
            console.log(`[GPT-ERROR] Error while Chat GPT reply on user request: ${error}`);
        }
    }; 
}
