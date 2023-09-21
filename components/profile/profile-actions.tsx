"use client";

import { useUser } from "@/hooks/use-user";
import Icon from "../icon";
import Button from "../ui/button";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useCustomFetch } from "@/hooks/use-custom-fetch";

const ProfileActions = ({ id }: { id: string }) => {
  const fetch = useCustomFetch();
  const [user, user_loading] = useUser();

  const client = useQueryClient();

  const isFollowed = useQuery({
    queryKey: ["follow-check", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const res = await fetch(`/api/users/${user.id}/check-follow/${id}`).then(
        (res) => res?.json(),
      );

      return res?.message === "You are following this user.";
    },
  });

  const follow = useMutation({
    mutationKey: ["follow", id],
    async mutationFn({
      id,
      recipient_id,
    }: {
      id: string;
      recipient_id: string;
    }) {
      const res = await fetch(`/api/users/${id}/follow/${recipient_id}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(await res?.json());
    },
    onSuccess(data, variables) {
      client.setQueryData(["follow-check", user?.id], true);
    },
  });

  const unfollow = useMutation({
    mutationKey: ["unfollow", id],
    async mutationFn({
      id,
      recipient_id,
    }: {
      id: string;
      recipient_id: string;
    }) {
      const res = await fetch(`/api/users/${id}/unfollow/${recipient_id}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(await res?.json());
    },
    onSuccess(data, variables) {
      client.setQueryData(["follow-check", user?.id], false);
    },
  });

  if (user_loading || isFollowed.isLoading)
    return (
      <div className="mt-6 flex gap-2">
        <span className="flex h-[39px] w-32 animate-pulse rounded-full bg-foreground/10" />

        <span className="flex aspect-square h-[39px] animate-pulse rounded-full bg-foreground/10" />
      </div>
    );

  if (!user_loading && !user) return <></>;

  if (!user) return <></>;

  return (
    <div className="mt-6 flex gap-2">
      {user?.id?.toString() === id.toString() ? (
        <Link href={"/account/general"}>
          <Button color="foreground" className="rounded-full px-6">
            Edit profile
          </Button>
        </Link>
      ) : isFollowed.data ? (
        <Button
          onClick={() => {
            unfollow.mutate({ recipient_id: id, id: user.id.toString() });
          }}
          loading={unfollow.isLoading}
          color="foreground"
          variant="outlined"
          className="rounded-full px-6 hover:border-error/10 hover:bg-error/10 hover:text-error"
        >
          Unfollow
        </Button>
      ) : (
        <Button
          onClick={() => {
            follow.mutate({ recipient_id: id, id: user.id.toString() });
          }}
          loading={follow.isLoading}
          color="primary"
          className="rounded-full px-6"
        >
          Follow
        </Button>
      )}

      <Button
        color="foreground"
        variant="outlined"
        className="rounded-full p-2 text-[21px]"
      >
        <Icon name="MoreHorizontal" />
      </Button>
    </div>
  );
};

export default ProfileActions;
