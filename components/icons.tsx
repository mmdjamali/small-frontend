import { IconType } from "react-icons";
import {
  RiArrowDownSLine,
  RiCheckboxBlankCircleLine,
  RiDiscordFill,
  RiEyeCloseLine,
  RiEyeLine,
  RiFacebookFill,
  RiFunctionFill,
  RiGoogleFill,
  RiLoader5Line,
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
  Logo: RiFunctionFill,
  Eye: RiEyeLine,
  EyeClose: RiEyeCloseLine,
  ArrowDown: RiArrowDownSLine,
};
