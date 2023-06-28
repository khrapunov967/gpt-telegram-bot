import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { openai } from "./services/openai.js";
import "dotenv/config.js";

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.on(message("text"), async (ctx) => {
    await ctx.reply("Подождите, формирую ответ...");

    try {
        const gptResponse = await openai.reply(ctx.message.text);
        await ctx.reply(gptResponse);

    } catch (error) {
        await ctx.reply("Упс! Что-то пошло не так. Попробуйте спросить еще раз");
        console.log(`[ERROR] Error while voice message: ${error.message}`);
    }
});

bot.on(message("voice"), async (ctx) => {

});

bot.command("start", async (ctx) => {
    await ctx.reply("Привет, я - Chat GPT. Задавайте свои вопросы!");
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));