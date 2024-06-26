"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useDebounce } from "@/lib/useDebounce";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathName = usePathname();
  const debouncedValue = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedValue) {
      router.push(`/discover?search=${debouncedValue}`);
    } else if (!debouncedValue && pathName === "/discover") {
      router.push(`/discover`);
    }
  }, [router, debouncedValue, pathName]);

  return (
    <div className="relative mt-8 block">
      <Input
        className="input-class py-6 pl-12 focus-visible:ring-offset-orange-1"
        placeholder="Search for podcasts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onLoad={(e) => setSearchTerm("")}
      ></Input>
      <Image
        src="/icons/search.svg"
        alt="search"
        width={20}
        height={20}
        className="absolute left-4 top-3.5"
      />
    </div>
  );
};

export default SearchBar;
