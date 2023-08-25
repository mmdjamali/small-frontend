import Link from "next/link";
import Icon from "../icon";
import { siteConfig } from "@/config";

const MainLogo = () => {
  return (
    <Link className="flex items-center justify-center gap-1 mr-8" href="/">
      <Icon
        name="Logo"
        className="text-[24px] text-primary h-[24px] aspect-square"
      />
      <p className="text-[16px] hidden sm:flex font-semibold text-primary">
        {siteConfig?.name}
      </p>
    </Link>
  );
};

export default MainLogo;
