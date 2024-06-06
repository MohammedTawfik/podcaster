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

export const generatePodcastThumbnailAction = action({
  args: {
    prompt: v.string(),
  },
  handler: async (_, args) => {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: args.prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });
    const image_url = response.data[0].url;
    if (!image_url) {
      throw new Error("Failed to generate image");
    }
    const image = await fetch(image_url);
    const buffer = await image.arrayBuffer();
    return buffer;
  },
});
