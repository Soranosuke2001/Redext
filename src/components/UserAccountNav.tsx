"use client";

import { User } from "next-auth";
import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut, Navigation, Plus, Rss, Settings2 } from "lucide-react";

interface UserAccountNavProps {
  user: Pick<User, "name" | "image" | "email">;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      {/* Triggers the dropdown menu to open and close */}
      <DropdownMenuTrigger>
        <UserAvatar
          className="h-8 w-8"
          user={{
            name: user.name || null,
            image: user.image || null,
          }}
        />
      </DropdownMenuTrigger>

      {/* The content to show when the dropdown menu is open */}
      <DropdownMenuContent
        className="bg-white dark:bg-black dark:border-neutral-600"
        align="end"
      >
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-zinc-700 dark:text-neutral-400">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />

        {/* List of dropdown menu items */}
        <DropdownMenuItem asChild>
          <Link href="/" className="font-medium gap-2">
            <Rss className="w-4 h-4 ml-1" />
            Feed
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/r/create" className="font-medium gap-2">
            <Plus className="w-5 h-5 rounded-md" />
            Create Community
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/r/explore" className="font-medium gap-2">
            <Navigation className="w-4 h-4 mr-1" />
            Explore Communities
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="font-medium gap-2">
            <Settings2 className="w-5 h-5" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            });
          }}
          className="cursor-pointer"
        >
          <div className="flex gap-2">
            <LogOut className="w-5 h-5" />
            Sign Out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
