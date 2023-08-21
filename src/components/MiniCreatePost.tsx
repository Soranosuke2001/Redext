"use client";

import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import UserAvatar from "./UserAvatar";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { ImageIcon, Link2 } from "lucide-react";

interface MiniCreatePostProps {
  session: Session | null;
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <li className="overflow-hidden rounded-md bg-white dark:bg-neutral-800 shadow list-none">
      <div className="h-max md:px-6 py-4 flex justify-between gap-2 md:gap-6">
        <div className="relative ml-2">
          <UserAvatar
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
          />

          {/* Online status of the user */}
          <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white dark:outline-none"></span>
        </div>

        <Input
          readOnly
          onClick={() => router.push(pathname + "/submit")}
          placeholder="Create Post"
          className="mr-2 md:mr-0"
        />

        <Button
          variant="ghost"
          onClick={() => router.push(pathname + "/submit")}
          className="hidden md:block"
        >
          <ImageIcon className="text-zinc-600 dark:text-neutral-400" />
        </Button>

        <Button
          variant="ghost"
          onClick={() => router.push(pathname + "/submit")}
          className="hidden md:block"
        >
          <Link2 className="text-zinc-600 dark:text-neutral-400" />
        </Button>
      </div>
    </li>
  );
};

export default MiniCreatePost;
