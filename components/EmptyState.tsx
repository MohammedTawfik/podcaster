import { EmptyStateProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const EmptyState = ({
  title,
  search,
  buttonLink,
  buttonText,
}: EmptyStateProps) => {
  return (
    <section className="flex-center flex-col gap-3 size-full">
      <Image src="/icons/emptystate.svg" width={250} height={250} alt="empty" />
      <div className="flex-center flex-col w-full gap-3 max-w-[254px]">
        <h1 className="text-16 text-center font-medium text-white-1">
          {title}
        </h1>
        {search && (
          <p className="text-16 text-center font-medium text-white-2">
            Try adjusting your search criteria
          </p>
        )}
        {buttonLink && buttonText && (
          <Button className="bg-orange-1 flex">
            <Link href={buttonLink} className="gap-1 flex">
              <Image
                src="/icons/discover.svg"
                width={20}
                height={20}
                alt="discover"
              />
              <h1 className="text-16 font-extrabold text-white-1">
                {buttonText}
              </h1>
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
};

export default EmptyState;
