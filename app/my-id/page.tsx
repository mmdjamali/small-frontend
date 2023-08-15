import { BACKEND_URL } from "@/config/env";
import { getAxios } from "@/lib/axios-with-jwt";
import { cookies } from "next/headers";

async function Page() {
  let data;
  let error;

  const axios = getAxios(
    cookies().get("ktb_access_token")?.value ?? "",
    cookies().get("ktb_refresh_token")?.value ?? ""
  );

  try {
    data = (await axios.get(BACKEND_URL ?? ""))?.data?.data;
  } catch (err) {
    error = err;
  }

  if (error) return <p>Something went wrong!</p>;

  return <div>{data ?? "no data"}</div>;
}

export default Page;
