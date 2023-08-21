import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import SearchBar from "./SearchBar";
import ThemeToggle from "./dark-mode/ThemeToggle";
import Image from "next/image";
import logo from "../../public/icon.png";
import { LogIn } from "lucide-react";

const Navbar = async () => {
  // Gets the current user's session if it exists
  const session = await getAuthSession();

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 dark:bg-zinc-900 border-b dark:border-b-neutral-600 border-b-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full md:mx-auto px-3 flex items-center justify-between gap-2">
        {/* App Logo */}
        <div className="min-w-fit">
          <Link href="/" className="flex justify-center gap-2">
            <Image src={logo} alt="Redext Logo" className="w-10 h-10" />
            <p className="hidden text-black dark:text-white text-sm font-medium md:block mt-auto mb-auto">
              Redext
            </p>
          </Link>
        </div>

        {/* Search Bar */}
        <SearchBar />

        <div className="flex gap-3">
          {/* Light/Dark Theme Toggle Button */}
          <ThemeToggle />
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
              <LogIn className="block md:hidden" />
              <p className="hidden md:block">Sign In</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
