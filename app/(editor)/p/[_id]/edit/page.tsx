import EditStory from "@/components/edit-story";
import { NextPage } from "next";

const Page: NextPage = ({}) => {
  return (
    <EditStory
      post={{
        content: [
          {
            id: "mhTl6ghSkV",
            type: "paragraph",
            data: {
              text: "Hey. Meet the new Editor. On this picture you can see it in action. Then, try a demo 🤓",
            },
          },
          {
            id: "l98dyx3yjb",
            type: "header",
            data: {
              text: "Key features",
              level: 3,
            },
          },
        ],
        published: false,
        title: "Testing",
      }}
    />
  );
};

export default Page;
