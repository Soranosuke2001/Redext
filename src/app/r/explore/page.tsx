import CommunityList from "@/components/explore/CommunityList";
import { Navigation } from "lucide-react";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <h1 className="flex items-center font-bold text-3xl md:text-4xl">
        <Navigation className="mr-4" />
        Explore
      </h1>
      {/* @ts-expect-error server component */}
      <CommunityList />
    </>
  );
};

export default page;
