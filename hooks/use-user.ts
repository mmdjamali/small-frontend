import { useCustomFetch } from "./use-custom-fetch";
import { GetProfileApiResponse } from "@/types/api";
import { UserType } from "@/types/user";
import { useQuery } from "react-query";

type State = UserType | null;

let state: State;

let listeners: Array<(state: State) => void> = [];

const dispacth = (new_state: State) => {
  listeners.forEach((setState) => setState(new_state));
  state = new_state;
};

export const useUser = () => {
  const fetch = useCustomFetch();

  const res = useQuery({
    queryKey: "user",
    queryFn: async () => {
      const res: GetProfileApiResponse = await fetch("/api/profiles/me", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res?.json());

      if (!res?.success) return null;

      return res.data.user;
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return { ...res, user: res.data } as const;
};
