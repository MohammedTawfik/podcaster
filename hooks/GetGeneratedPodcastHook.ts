"use client";

import { api } from "@/convex/_generated/api";
import { GeneratePodcastProps } from "@/types";
import { useAction, useMutation } from "convex/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { generateUploadUrl } from "@/convex/files";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useToast } from "@/components/ui/use-toast";
import { title } from "process";

const useGeneratePodcast = ({
  voiceType,
  setAudio,
  audioUrl,
  setAudioStorageId,
  voicePrompt,
  setVoicePrompt,
  setAudioDuration,
}: GeneratePodcastProps) => {
  // Reference the Convex action
  const getPodcastAudio = useAction(api.openai_actions.generateAudioAction);
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const getAudioUrl = useMutation(api.podcasts.getPodcastUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio("");

    if (!voicePrompt) {
      toast({
        title: "Prompt Missing",
        description: "Please provide a prompt to generate audio",
      });
      setIsGenerating(false);
      return;
    }

    try {
      const audioResponse = await getPodcastAudio({
        prompt: voicePrompt,
        voiceType: voiceType,
      });

      const blob = new Blob([audioResponse], { type: "audio/mpeg" });
      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, { type: "audio/mpeg" });
      const uploadStatus = await startUpload([file]);
      const storageId = (uploadStatus[0].response as any).storageId;
      setAudioStorageId(storageId);
      const audioUrl = await getAudioUrl({ storageId });
      setAudio(audioUrl!);
      setIsGenerating(false);
      toast({
        title: "Podcast Generated",
        description: "Podcast has been successfully generated",
      });
    } catch (error) {
      console.log("Error in generating podcast", error);
      setIsGenerating(false);
      toast({
        title: "Podcast Generation Error",
        variant: "destructive",
        description: "An Error occurred while generating the podcast",
      });
      return;
    }
  };
  return { isGenerating, generatePodcast };
};

export default useGeneratePodcast;
