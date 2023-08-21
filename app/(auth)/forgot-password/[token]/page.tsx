import ResetPassword from "@/components/auth/reset-password";
import { BACKEND_URL } from "@/config/env";

type PageProps = {
  params: {
    token: string;
  };
};

const Page = async ({ params }: PageProps) => {
  if (params.token) return <p>Not valid!</p>;

  const res = await fetch(
    BACKEND_URL + "/api/auth/reset-password-confirmation",
    {
      method: "POST",
      headers: {
        "Content-type": "appliaction/json",
      },
      mode: "cors",
      body: JSON.stringify({
        resetPasswordToken: params.token,
      }),
    }
  );

  if (!res.ok) return <p>Not valid!</p>;

  if (!(await res.json()).success) return <p>Not valid!</p>;

  return (
    <main className="w-full min-h-screen px-4 sm:px-10 lg:px-12 grid place-items-center md:col-span-2 lg:col-span-1 z-10">
      <ResetPassword token={params.token} />
    </main>
  );
};

export default Page;
