import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="flex flex-col h-screen w-full items-center">
      <h1 className="text-5xl pt-32">Feature not complete</h1>
      <br />
      <p className="">
        Apologies. We are still developing this feature. Please try again later.
      </p>
    </div>
  );
};

export default page;
