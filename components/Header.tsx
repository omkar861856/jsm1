"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";

const Header = ({session}:{session:Session}) => {
  const pathName = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">&#9733; Bookwise</Link>

      <ul className="flex flex-row items-center gap-8">
       
        <li>
          <Link
            href="/library"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathName === "/library" ? "text-ligth-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>

        <li>
          <Link
            href="/my-profile"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathName === "/" ? "text-ligth-200" : "text-light-100"
            )}
          >
            <Avatar>
              <AvatarFallback className="text-black">{getInitials(session?.user?.name ?? 'IN')}</AvatarFallback>
            </Avatar>
          </Link>
        </li>

      </ul>
    </header>
  );
};

export default Header;
