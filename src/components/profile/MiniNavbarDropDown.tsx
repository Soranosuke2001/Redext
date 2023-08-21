import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { Button } from "../ui/Button";
import { ChevronDown } from "lucide-react";

interface MiniNavbarProps {
  isFetching: boolean;
  setNavOption: (option: string) => void;
  navOption: string;
}

const MiniNavbar: FC<MiniNavbarProps> = ({
  isFetching,
  setNavOption,
  navOption,
}) => {
  const activityOptions = ["Joined Communities", "Upvotes", "Downvotes"];

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {navOption}
            <ChevronDown className="ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col w-auto px-5 dark:bg-black border-none gap-1">
          {activityOptions.map((option, index) => (
            <DropdownMenuItem key={index} className="w-full" asChild>
              <button
                className={`${
                  navOption === option
                    ? "font-bold"
                    : "text-slate-500 dark:text-neutral-400"
                }`}
                disabled={isFetching}
                onClick={() => setNavOption(option)}
              >
                {option}
              </button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MiniNavbar;
