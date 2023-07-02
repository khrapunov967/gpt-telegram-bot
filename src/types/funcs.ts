// Open AI Service
export type chatGptReplyOnFunction = (content: string) => Promise<string | undefined>;

export type generateImageByPromptFunction = (prompt: string) => Promise<string | undefined>;