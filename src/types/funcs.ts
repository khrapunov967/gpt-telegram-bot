import { NarrowedContext, Context } from "telegraf";
import { Message, Update } from "telegraf/types";

// Open AI Service
export type chatGptReplyOnFunction = (content: string) => Promise<string | undefined>;

export type generateImageByPromptFunction = (prompt: string) => Promise<string | undefined>;

// GPT Controllers
export type startFunction = (ctx: NarrowedContext<Context<Update>, {
    message: Update.New & Update.NonChannel & Message.TextMessage;
    update_id: number;
    }>) => void;

export type getTextMessageFunction = (ctx: NarrowedContext<Context<Update>, Update.MessageUpdate<Record<"text", {}> & Message.TextMessage & AddOptionalKeys<never>>>) => void;