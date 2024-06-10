"use client";

import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Header from "./Header";
import Carousel from "./Carousel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ToastProvider } from "@radix-ui/react-toast";
import LoaderSpinner from "./LoaderSpinner";
import { useRouter } from "next/navigation";

const RightSidebar = () => {
  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount);
  const { user } = useUser();
  const router = useRouter();
  if (!topPodcasters) return <LoaderSpinner />;
  return (
    <section>
      <section className="right_sidebar text-white-1">
        <SignedIn>
          <Link href={`/profile/${user?.id}`} className="flex gap-3 pb-12">
            <UserButton />
            <div className="flex w-full item-center justify-between">
              <h1 className="text-16 font-semibold text-white-1 truncate">
                {user?.firstName} {user?.lastName}
              </h1>
              <Image
                src="/icons/right-arrow.svg"
                alt="arrow"
                width={24}
                height={24}
              />
            </div>
          </Link>
        </SignedIn>
        <Header title="Fans Like You" />
        <Carousel fansLikeDetails={topPodcasters!} />
      </section>
      <section className="flex flex-col gap-8 pt-12">
        <Header title="Top Podcasters" />
        <div className="flex flex-col gap-6">
          {topPodcasters?.slice(0, 5).map((podcaster) => (
            <div
              key={podcaster._id}
              className="flex justify-between cursor-pointer"
              onClick={() => router.push(`/profile/${podcaster.clerkId}`)}
            >
              <figure className="flex items-center gap-2">
                <Image
                  src={podcaster.imageUrl}
                  alt={podcaster.name}
                  width={44}
                  height={44}
                  className="rounded-lg aspect-square"
                />
                <h2 className="text-14 font-semibold text-white-1">
                  {podcaster.name}
                </h2>
              </figure>
              <div className="flex items-center">
                <p className="text-12 font-normal text-white-3">
                  {podcaster.totalPodcasts} Podcasts
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default RightSidebar;
