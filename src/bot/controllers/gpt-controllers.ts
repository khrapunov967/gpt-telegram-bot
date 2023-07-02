import { OpenAI } from "../../services/openai.js";
import * as types from "../../types/funcs.js";

export const start: types.startFunction = async (ctx) => {
    await ctx.reply("Hello there. I'am Open AI Telegram Bot. How can I help you?");
};

export const getTextMessage: types.getTextMessageFunction = async (ctx) => {
    await ctx.reply("Wait, let me think...");

    try {
        const gptResponse = await OpenAI.chatGptReplyOn(ctx.message.text)
        await ctx.reply(gptResponse || "Could not get response :^(");

    } catch (error) {
        await ctx.reply("Something went wrong. Please, try again later");
    }
}