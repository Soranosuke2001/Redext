import Link from "next/link";
import { toast } from "./use-toast";
import { buttonVariants } from "@/components/ui/Button";

export const useCustomToast = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: "Login Required",
      description:
        "You must be logged in first in order to proceed with the action.",
      variant: "destructive",
      action: (
        <Link
          className={buttonVariants({ variant: "outline" })}
          href="/sign-in"
          onClick={() => dismiss()}
        >
          Login
        </Link>
      ),
    });
  };

  return { loginToast };
};
