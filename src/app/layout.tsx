import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/Toaster";

import "@/styles/globals.css";
import { ThemeProvider } from "@/components/dark-mode/Theme-Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Redext",
  description: "A Reddit clone built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        inter.className
      )}
    >
      <body className="min-h-screen pt-12 bg-slate-50 dark:bg-neutral-900 antialiased">
        <ThemeProvider attribute="class" defaultTheme="light">
          <Providers>
            {/* @ts-expect-error server component */}
            <Navbar />

            {authModal}
            <div className="container max-w-7xl mx-auto h-full pt-9 pb-20">
              {children}
            </div>
            <Toaster />
          </Providers>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
