"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { voiceDetails } from "@/constants";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import GeneratePodcast from "@/components/GeneratePodcast";
import GeneratePodcastThumbnail from "@/components/GeneratePodcastThumbnail";
import { Loader } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { VoiceType } from "@/types";

const formSchema = z.object({
  podcastTitle: z.string().min(2, {
    message: "podcastTitle must be at least 2 characters.",
  }),
  podcastDescription: z.string().min(2, {
    message: "podcastDescription must be at least 2 characters.",
  }),
});

const CreatePodcast = () => {
  const router = useRouter();
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(
    null
  );

  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [audioUrl, setAudioUrl] = useState("");
  const [audioDuration, setAudioDuration] = useState(0);

  const [voicePrompt, setVoicePrompt] = useState("");
  const { toast } = useToast();
  const createPodcast = useMutation(api.podcasts.createPodcast);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      if (!audioUrl || !imageUrl || !selectedVoice) {
        toast({
          title: "Missing Fields",
          description: "Please fill all the fields",
          variant: "destructive",
        });
        setIsSubmitting(false);
        throw new Error("Please fill all the fields");
      }

      const createdPodcast = await createPodcast({
        title: values.podcastTitle,
        description: values.podcastDescription,
        audioUrl: audioUrl,
        audioStorageId: audioStorageId!,
        imageUrl: imageUrl,
        imageStorageId: imageStorageId!,
        voicePrompt: voicePrompt,
        imagePrompt: imagePrompt,
        voiceType: selectedVoice,
        duration: audioDuration,
        views: 0,
      });
      setIsSubmitting(false);
      toast({
        title: "Podcast Created",
        description: "Podcast has been created successfully",
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Generating podcast",
        description: "Failed to create a podcast",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  }

  return (
    <section className="flex flex-col mt-10">
      <h1 className="text-20 font-bold text-white-1">Create Podcasts</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex flex-col w-full"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Podcast Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Podcast Title"
                      {...field}
                      className="input-class focus-visible:ring-offset-orange-1"
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-white-1 ">
                Select AI Voice
              </Label>
              <Select onValueChange={(value) => setSelectedVoice(value)}>
                <SelectTrigger
                  className={cn(
                    "text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1"
                  )}
                >
                  <SelectValue
                    placeholder="Select AI Voice"
                    className="placeholder:text-gray-1"
                  />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-offset-orange-1">
                  {voiceDetails.map((voice) => {
                    return (
                      <SelectItem
                        className="capitalize focus:bg-orange-1"
                        key={voice.id}
                        value={voice.name}
                      >
                        {voice.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
                (selectedVoice
                <audio
                  src={`${selectedVoice}.mp3`}
                  autoPlay
                  className="hidden"
                ></audio>
                )
              </Select>
            </div>
            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Podcast Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a short description about the podcast"
                      {...field}
                      className="input-class focus-visible:ring-offset-orange-1"
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col pt-10">
            <GeneratePodcast
              setAudioStorageId={setAudioStorageId}
              setAudio={setAudioUrl}
              setVoicePrompt={setVoicePrompt}
              setAudioDuration={setAudioDuration}
              voiceType={selectedVoice as VoiceType}
              audioUrl={audioUrl}
              voicePrompt={voicePrompt}
            />

            <GeneratePodcastThumbnail
              setImagePrompt={setImagePrompt}
              setImage={setImageUrl}
              imagePrompt={imagePrompt}
              setImageStorageId={setImageStorageId}
              imageUrl={imageUrl}
            />
            <div className="mt-10 w-full">
              <Button
                type="submit"
                className="text-16 w-full bg-orange-1 text-white-1 py-4 font-extrabold transition-all duration-500 hover:bg-black-1"
              >
                {isSubmitting ? (
                  <>
                    Submitting...
                    <Loader size={20} className="animate-spin ml-2" />
                  </>
                ) : (
                  "Submit and Publish Podcast"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcast;
