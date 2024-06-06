"use client";
import PodcastCard from "@/components/PodcastCard";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

const Home = () => {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);
  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
        <div className="podcast_grid">
          {trendingPodcasts?.map((podcast) => {
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
      </section>
    </div>
  );
};

export default Home;
