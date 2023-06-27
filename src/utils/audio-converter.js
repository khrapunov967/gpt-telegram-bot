import { createWriteStream } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { removeFile } from "./remove-file.js";
import axios from "axios";
import ffmpeg from "fluent-ffmpeg";
import installer from "@ffmpeg-installer/ffmpeg"

const __dirname = dirname(fileURLToPath(import.meta.url));

class AudioConverter {
    constructor() {
        ffmpeg.setFfmpegPath(installer.path)
    }

    createOgg = async (url, fileName) => {
        try {
            const oggPath = resolve(__dirname, "../../voices", `${fileName}.ogg`);

            const response = await axios({
                method: "get",
                url,
                responseType: "stream"
            });

            return new Promise(resolve => {
                const stream = createWriteStream(oggPath);
                response.data.pipe(stream);

                stream.on("finish", () => resolve(oggPath));
            });

        } catch (error) {
            console.log(`[ERROR] Error while create OGG file: ${error.message}`);
        }
    };

    oggToMp3 = async (oggPath, userId) => {
        try {
            const outputPath = resolve(dirname(oggPath), `${userId}.mp3`);

            return new Promise((resolve, reject) => {
                ffmpeg(oggPath)
                    .inputOption("-t 30")
                    .output(outputPath)
                    .on("end", () => {
                        removeFile(oggPath);
                        resolve(outputPath);
                    })
                    .on("error", (err) => reject(err.message))
                    .run()
            });

        } catch (error) {
            console.log(`[ERROR] Error while convert OGG to Mp3: ${error.message}`);
        }
    };
};

export const Converter = new AudioConverter();