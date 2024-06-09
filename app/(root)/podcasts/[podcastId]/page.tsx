"use client";
import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import PodcastDetailPlayer from "@/components/PodcastDetailPlayer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import React from "react";

const PodcastDetails = ({
  params,
}: {
  params: { podcastId: Id<"podcasts"> };
}) => {
  const podcast = useQuery(api.podcasts.getPodcastById, {
    podcastId: params.podcastId,
  });

  const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType, {
    podcastId: params.podcastId,
  });

  if (!podcast || !similarPodcasts) {
    return <LoaderSpinner />;
  }
  return (
    <section className="flex flex-col w-full">
      <header className="mt-9 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">Currently Playing</h1>
        <figure className="flex gap-3">
          <Image
            src="/icons/headphone.svg"
            alt="headphone"
            width={24}
            height={24}
          />
          <h2 className="text-16 font-bold text-white-1">{podcast?.views}</h2>
        </figure>
      </header>
      <PodcastDetailPlayer />
      <p className="text-white-1 font-medium text-16 pb-8 pt-[45px] max-md:text-center">
        {podcast?.description}
      </p>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Transcription</h1>
          <p className="text-16 font-medium text-white-2">
            {podcast?.voicePrompt}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Thumbnail Prompt</h1>
          <p className="text-16 font-medium text-white-2">
            {podcast?.imagePrompt}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Voice Type</h1>
          <p className="text-16 font-medium text-white-2">
            {podcast?.voiceType}
          </p>
        </div>
      </div>
      <section className="flex flex-col gap-5 mt-8">
        <h1 className="text-20 font-bold text-white-1">Similar Podcasts</h1>
        {similarPodcasts && similarPodcasts.length > 0 ? (
          <div className="podcast_grid">
            {similarPodcasts?.map((podcast) => {
              return (
                <PodcastCard
                  key={podcast._id}
                  imageUrl={podcast.imageUrl!}
                  title={podcast.title}
                  description={podcast.description}
                  id={podcast._id!}
                ></PodcastCard>
              );
            })}
          </div>
        ) : (
          <>
            <EmptyState
              title="No similar podcasts found"
              buttonLink="/discover"
              buttonText="Discover more podcasts"
            />
          </>
        )}
      </section>
    </section>
  );
};

export default PodcastDetails;
