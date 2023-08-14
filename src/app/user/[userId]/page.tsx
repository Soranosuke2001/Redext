import UserInfo from "@/components/profile/UserInfo";

interface PageProps {
  params: {
    userId: string;
  };
}

const page = ({ params }: PageProps) => {
  const { userId } = params;

  return (
    <>
      <UserInfo userId={userId} />
    </>
  );
};

export default page;
