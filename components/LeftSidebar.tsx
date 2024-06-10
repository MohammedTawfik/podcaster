"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

const LeftSidebar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  return (
    <section className="left_sidebar">
      <nav className="flex flex-col gap-6">
        <Link
          href="/"
          className="flex cursor-pointer items-center pb-10 justify-center gap-1"
        >
          <Image src="/icons/logo.svg" alt="logo" width={23} height={27} />
          <h1 className="text-24 font-extrabold text-white max-lg:hidden ">
            Podcaster
          </h1>
        </Link>
        {sidebarLinks.map((link) => {
          const isActive =
            pathName === link.route || pathName.startsWith(`${link.route}/`);
          return (
            <Link
              key={link.label}
              href={link.route}
              className={cn(
                "flex cursor-pointer items-center gap-3 py-4 justify-start max-lg:justify-start",
                isActive ? "bg-nav-focus border-r-4 border-orange-1" : ""
              )}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-16 font-semibold text-white">{link.label}</p>
            </Link>
          );
        })}
      </nav>
      <SignedOut>
        <div className="flex flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button className="text-16 w-full bg-orange-1 font-extrabold" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button
            className="text-16 w-full bg-orange-1 font-extrabold"
            onClick={() =>
              signOut(() => {
                router.push("/");
              })
            }
          >
            Log Out
          </Button>
        </div>
      </SignedIn>
    </section>
  );
};

export default LeftSidebar;
