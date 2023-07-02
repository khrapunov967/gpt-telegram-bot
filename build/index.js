import { bot } from "./bot.js";
import express from "express";
import "dotenv/config.js";
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    try {
        bot.launch();
        console.log("Telegram Bot Launched...");
    }
    catch (error) {
        process.exit(1);
    }
});
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
//# sourceMappingURL=index.js.map