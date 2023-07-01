import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { OpenAI } from "./services/openai.js";
import express from "express";
import "dotenv/config.js";
const bot = new Telegraf(process.env.TELEGRAM_TOKEN || "");
const app = express();
const PORT = process.env.PORT || 5000;
bot.command("start", async (ctx) => {
    await ctx.reply("Hello there. I'am Open AI Telegram Bot. How can I help you?");
});
bot.on(message("text"), async (ctx) => {
    await ctx.reply("Wait, let me think...");
    try {
        const gptResponse = await OpenAI.chatGptReplyOn(ctx.message.text);
        await ctx.reply(gptResponse || "Could not get response :^(");
    }
    catch (error) {
        await ctx.reply("Something went wrong. Please, try again later");
    }
});
bot.on(message("voice"), async (ctx) => {
    try {
        await ctx.reply("Я не могу обрабатывать голосовые сообщения!");
    }
    catch (error) {
        console.log(`[TELEGRAF-ERROR]: ${error}`);
    }
});
app.listen(PORT, () => {
    try {
        bot.launch().then(() => {
            console.log("Telegram Bot Launched");
        });
    }
    catch (error) {
        process.exit(1);
    }
});
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
//# sourceMappingURL=index.js.map