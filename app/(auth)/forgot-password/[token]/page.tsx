import ResetPassword from "@/components/auth/reset-password";

type PageProps = {
  params: {
    token: string;
  };
};

const Page = ({ params }: PageProps) => {
  return (
    <main className="w-full min-h-screen px-4 sm:px-10 lg:px-12 grid place-items-center md:col-span-2 lg:col-span-1 z-10">
      <ResetPassword token={params.token} />
    </main>
  );
};

export default Page;
