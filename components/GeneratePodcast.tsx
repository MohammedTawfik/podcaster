import { GeneratePodcastProps } from "@/types";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import useGeneratePodcast from "@/hooks/GetGeneratedPodcastHook";

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);
  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold text-white-1">
          AI Prompt to Generate Podcast
        </Label>
        <Textarea
          className="input-class font-light focus-visible:ring-offset-orange-1"
          placeholder="Provide text to generate audio"
          rows={5}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button
          className="text-16 bg-orange-1 text-white-1 py-4 font-bold"
          onClick={generatePodcast}
          type="button"
        >
          {isGenerating ? (
            <>
              Generating...
              <Loader size={20} className="animate-spin ml-2" />
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>
      {props.audioUrl && (
        <audio
          controls
          autoPlay
          className="mt-5"
          src={props.audioUrl}
          onLoadedMetadata={(e) => {
            props.setAudioDuration(e.currentTarget.duration);
          }}
        ></audio>
      )}
    </div>
  );
};

export default GeneratePodcast;
