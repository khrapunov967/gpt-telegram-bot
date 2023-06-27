import { unlink } from "fs/promises";

export const removeFile = async (path) => {
    await unlink(path)
};