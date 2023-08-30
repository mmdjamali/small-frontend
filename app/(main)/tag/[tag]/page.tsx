import Feed from "@/components/feed";

interface PageProps {
  params: {
    tag: string;
  };
}

export default async function Page({ params }: PageProps) {
  return <Feed active={params.tag} />;
}
