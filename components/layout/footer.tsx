import Link from "next/link";
import Icon from "../icon";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="mt-8 border-t border-dashed border-border">
      <footer className="mx-auto grid max-w-[1300px] px-4 pb-8 md:px-8">
        <div className="flex flex-col items-center justify-between gap-10 pb-16 pt-20 md:flex-row">
          <Link href={"/"}>
            <Icon
              name="Logo"
              className="h-[21px] text-foreground/75 hover:text-foreground"
            />
          </Link>
          <div className="mx-auto flex w-fit flex-wrap items-center justify-center gap-8 md:mx-0">
            {links.map(({ name, url, imageURL }) => {
              return (
                <Link
                  className="flex items-center justify-center gap-2 font-medium text-foreground/75 transition-colors hover:text-foreground"
                  key={name}
                  href={url}
                >
                  <div className="relative aspect-square h-6 overflow-hidden rounded-full bg-foreground/10">
                    <Image fill alt="" unoptimized src={imageURL} />
                  </div>

                  {name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-4">
            <Link href="https://github.com/mmdjamali/small-frontend">
              <Icon
                name="Github"
                className="text-[21px] text-foreground/75 transition-colors hover:text-foreground"
              />
            </Link>
            <Icon
              name="TwitterX"
              className="text-[21px] text-foreground/75 transition-colors hover:text-foreground"
            />
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <p className="text-sm text-foreground/75">© 2023 Small</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

const links = [
  {
    url: "https://github.com/mmdjamali",
    name: "Mohammad Jamali",
    imageURL: "https://github.com/mmdjamali.png",
  },
  {
    url: "https://github.com/karabeyogluonur",
    name: "Onur Karabeyoglu",
    imageURL: "https://github.com/karabeyogluonur.png",
  },
  // {
  //   url: "https://github.com/kaankarakoc42",
  //   name: "Kaan Karakoc",
  //   imageURL: "https://github.com/kaankarakoc42.png",
  // },
];
