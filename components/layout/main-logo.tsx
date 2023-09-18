import Link from "next/link";
import Icon from "../icon";
import { siteConfig } from "@/config";
import Image from "next/image";

const MainLogo = () => {
  return (
    <Link
      className="mr-8 flex items-center justify-center gap-1 text-primary"
      href="/"
    >
      <Icon name="Logo" className="h-[21px] text-[21px]" />
    </Link>
  );
};

export default MainLogo;
