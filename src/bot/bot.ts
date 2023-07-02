import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { getTextMessage, start } from "./controllers/gpt-controllers.js";
import "dotenv/config.js";

export const bot = new Telegraf(process.env.TELEGRAM_TOKEN || "");

// commands
bot.command("start", start);

// messages
bot.on(message("text"), getTextMessage);