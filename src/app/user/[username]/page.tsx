import UserInfo from "@/components/profile/UserInfo";

interface PageProps {
  params: {
    username: string;
  };
}

const page = ({ params }: PageProps) => {
  const { username } = params;

  return (
    <>
      <UserInfo username={username} />
    </>
  );
};

export default page;
