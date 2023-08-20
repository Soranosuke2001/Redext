"use client";

import { useTheme } from "next-themes";
import { FC, useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Moon, Sun } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ThemeToggleProps {}

const ThemeToggle: FC<ThemeToggleProps> = ({}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Feature Unavailable",
            description:
              "Apologies. This feature is still in development. Please try again later.",
            variant: "destructive",
          })
        }
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      </Button>
      {/* {theme === "light" ? (
          // Need to add stuff here
          // Implementing the dark theme
          <Button variant="outline" onClick={() => setTheme("dark")}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setTheme("light")}>
            <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        )} */}
    </>
  );
};

export default ThemeToggle;
