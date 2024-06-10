import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Header = ({
  title,
  classNames,
}: {
  title?: string;
  classNames?: string;
}) => {
  return (
    <header className="flex items-center justify-between">
      {title ? (
        <h1 className={cn("text-18 font-bold text-white-1", classNames)}>
          {title}
        </h1>
      ) : (
        <div />
      )}
      <Link href="/discover" className="text-14 font-semibold text-orange-1">
        View all
      </Link>
    </header>
  );
};

export default Header;
