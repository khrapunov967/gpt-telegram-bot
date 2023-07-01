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
        return (_b = response.data.choices[0].message) === null || _b === void 0 ? void 0 : _b.content;
    }
    catch (error) {
        console.log(`[GPT-ERROR] Error while Chat GPT reply on user request: ${error}`);
    }
};
//# sourceMappingURL=openai.js.map