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

const RightSidebar = () => {
  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount);
  const { user } = useUser();

  if (!topPodcasters) return <LoaderSpinner />;
  return (
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
  );
};

export default RightSidebar;
