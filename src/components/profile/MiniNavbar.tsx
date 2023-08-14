import { FC } from "react";

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
    <>
      <div className="w-full flex justify-around">
        {activityOptions.map((option, index) => (
          <div
            key={index}
            className="text-md relative after:bg-black after:absolute after:h-1 after:w-0 after:-bottom-1/3 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
          >
            <button
              disabled={isFetching}
              onClick={() => setNavOption(option)}
              className={`${
                navOption === option ? "font-bold" : "text-slate-500"
              }`}
            >
              {option}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default MiniNavbar;
