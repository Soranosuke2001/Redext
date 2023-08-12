import { Post, Subscription, Vote } from "@prisma/client";
import UserAvatar from "./UserAvatar";
import { format } from "date-fns";

interface UserInfoProps {
  image: string;
  createdAt: string;
  Post: Post;
  Subscription: Subscription;
  Vote: Vote;
  username: string;
}

const UserInfo = ({
  image,
  createdAt,
  Post,
  Subscription,
  Vote,
  username,
}: UserInfoProps) => {
  const joinedDate = new Date(createdAt);

  return (
    <div className="flex">
      <UserAvatar
        user={{ image, name: username }}
        className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
      />
      <div className="ml-5 md:ml-10">
        <p className="text-lg md:text-3xl text-zinc-900">{`u/${username}`}</p>
        <br />
        <dt className="text-md md:text-lg text-zinc-500">Member Since</dt>
        <dd className="text-md md:text-lg text-zinc-500">
          <time dateTime={joinedDate.toDateString()}>
            {format(joinedDate, "MMMM d, yyyy")}
          </time>
        </dd>
      </div>
    </div>
  );
};

export default UserInfo;
