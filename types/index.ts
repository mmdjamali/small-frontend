import { Icons } from "@/components/icons";

export type IconKeyType = keyof typeof Icons;

interface NavItem {
  title: string;
  url?: string;
  description?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: IconKeyType;
}

interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithOptionalChildren[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SearchKeywordType = {
  keyword: string;
  createdDate: string;
};
