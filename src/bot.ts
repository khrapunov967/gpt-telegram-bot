import { 
    EN_ERROR_MESSAGE, 
    EN_START_MESSAGE, 
    EN_WAIT_MESSAGE, 
    RU_ERROR_MESSAGE, 
    RU_START_MESSAGE, 
    RU_WAIT_MESSAGE 
} from "./utils/constants.js";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { OpenAI } from "./services/openai.js";
import "dotenv/config.js";

// bot init
export const bot = new Telegraf(process.env.TELEGRAM_TOKEN || "");


// set commands
bot.telegram.setMyCommands([
    {
        command: "image",
        description: "Generate image by prompt"
    }
]);


// commands
bot.command("start", async (ctx) => {
    const languageCode = ctx.message.from.language_code;
    const message = languageCode === "ru" ? RU_START_MESSAGE : EN_START_MESSAGE;

    try {
        await ctx.reply(message);

    } catch (error) {
        await ctx.reply(languageCode === "ru" ? RU_ERROR_MESSAGE : EN_ERROR_MESSAGE);
    }
});

bot.command("image", async (ctx) => {
    await ctx.reply("Coming soon...");
});


// messages
bot.on(message("text"), async (ctx) => {
    const languageCode = ctx.message.from.language_code;
    await ctx.reply(languageCode === "ru" ? RU_WAIT_MESSAGE : EN_WAIT_MESSAGE);

    try {
        const gptResponse = await OpenAI.chatGptReplyOn(ctx.message.text)
        await ctx.reply(gptResponse || (languageCode === "ru" ? RU_ERROR_MESSAGE : EN_ERROR_MESSAGE));

    } catch (error) {
        await ctx.reply(languageCode === "ru" ? RU_ERROR_MESSAGE : EN_ERROR_MESSAGE);
    }
});