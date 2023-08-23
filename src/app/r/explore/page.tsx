import CommunityList from "@/components/explore/CommunityList";
import { Navigation } from "lucide-react";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <h1 className="flex items-center gap-2 font-bold text-3xl md:text-4xl">
        <Navigation />
        Explore
      </h1>
      {/* @ts-expect-error server component */}
      <CommunityList />
    </>
  );
};

export default page;
