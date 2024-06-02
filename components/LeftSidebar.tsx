"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const LeftSidebar = () => {
  const pathName = usePathname();
  const router = useRouter();
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
                "flex cursor-pointer items-center gap-3 py-4 justify-center max-lg:justify-start",
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
    </section>
  );
};

export default LeftSidebar;
