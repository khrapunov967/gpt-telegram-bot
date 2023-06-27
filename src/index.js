import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { Converter } from "./utils/audio-converter.js";
import { openai } from "./services/openai.js";
import "dotenv/config.js";

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.on(message("voice"), async (ctx) => {
    try {
        const fileLink = await ctx.telegram.getFileLink(ctx.message.voice.file_id)
        const userId = String(ctx.message.from.id);

        const oggPath = await Converter.createOgg(fileLink.href, userId);
        const mp3Path = await Converter.oggToMp3(oggPath, userId);

        const text = await openai.mp3ToText(mp3Path);
        // const response = await openai.reply(text);

        await ctx.reply(text);

    } catch (error) {
        console.log(`[ERROR] Error while voice message: ${error.message}`)
    }
})

bot.command("start", async (ctx) => {
    await ctx.reply(JSON.stringify(ctx.message))
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));