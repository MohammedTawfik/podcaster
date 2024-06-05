import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAudioAction = action({
  args: {
    voiceType: v.string(),
    prompt: v.string(),
  },
  handler: async (_, args) => {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: args.voiceType as SpeechCreateParams["voice"],
      input: args.prompt,
    });
    const buffer = await mp3.arrayBuffer();
    return buffer;
  },
});
