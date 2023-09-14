import Link from "next/link";
import Icon from "../icon";
import { siteConfig } from "@/config";

const MainLogo = () => {
  return (
    <Link
      className="mr-8 flex items-center justify-center gap-1 text-primary"
      href="/"
    >
      <Icon name="Logo" className="aspect-square h-[24px] text-[24px]" />
      {/* <p className="hidden text-[16px] font-semibold sm:flex">
        {siteConfig?.name}
      </p> */}
    </Link>
  );
};

export default MainLogo;
