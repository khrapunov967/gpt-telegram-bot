var _a;
import { Configuration, OpenAIApi } from "openai";
import "dotenv/config";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);
export class OpenAI {
}
_a = OpenAI;
OpenAI.chatGptReplyOn = async (content) => {
    var _b;
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                    "role": "user",
                    "content": content
                }]
        });
        return ((_b = response.data.choices[0].message) === null || _b === void 0 ? void 0 : _b.content) || "Sorry. I can't answer on your request. Try again later!";
    }
    catch (error) {
        console.log(`[GPT-ERROR] Error while Chat GPT reply on user request: ${error}`);
    }
};
OpenAI.generateImageByPrompt = async (prompt) => {
    try {
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024"
        });
        const url = response.data.data[0].url;
        return url || "Sorry, could not generate image by your prompt";
    }
    catch (error) {
        console.log(`[GENERATE-IMAGE-ERROR] Error while generate image on user prompt: ${error}`);
    }
};
//# sourceMappingURL=openai.js.map