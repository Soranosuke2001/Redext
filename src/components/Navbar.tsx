import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import SearchBar from "./SearchBar";
import ThemeToggle from "./dark-mode/ThemeToggle";

const Navbar = async () => {
  // Gets the current user's session if it exists
  const session = await getAuthSession();

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 dark:bg-zinc-900 border-b dark:border-b-neutral-600 border-b-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* App Logo */}
        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
          <p className="hidden text-black dark:text-white text-sm font-medium md:block">
            Redext
          </p>
        </Link>

        {/* Search Bar */}
        <SearchBar />

        <div className="flex gap-3">
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            // This is to make the 'Link" component look like a button component
            <Link
              href="/sign-in"
              className={buttonVariants({
                variant: "outline",
              })}
            >
              Sign In
            </Link>
          )}

          {/* Light/Dark Theme Toggle Button */}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
