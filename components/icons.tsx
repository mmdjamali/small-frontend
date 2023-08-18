import { IconType } from "react-icons";
import {
  RiArrowDownSLine,
  RiArticleFill,
  RiArticleLine,
  RiCheckboxBlankCircleLine,
  RiCloseLine,
  RiDiscordFill,
  RiEyeCloseLine,
  RiEyeLine,
  RiFacebookFill,
  RiFunctionFill,
  RiGoogleFill,
  RiLoader5Line,
  RiMenu2Line,
  RiUser2Line,
} from "react-icons/ri";

export const Icons: {
  [name: string]: IconType;
} = {
  User: RiUser2Line,
  Spinner: RiLoader5Line,
  Circle: RiCheckboxBlankCircleLine,
  Discord: RiDiscordFill,
  Google: RiGoogleFill,
  Facebook: RiFacebookFill,
  Logo: RiArticleFill,
  Eye: RiEyeLine,
  EyeClose: RiEyeCloseLine,
  ArrowDown: RiArrowDownSLine,
  Menu: RiMenu2Line,
  Close: RiCloseLine,
};
