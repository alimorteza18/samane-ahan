import { UrlObject } from "url";

type SingleSubItem = {
  label: string;
  href?: string | UrlObject;
  active?: boolean;
  subItems?: SingleSubItem[];
};

type SingleItemType = {
  label: string;
  icon?: JSX.Element;
  href?: string | UrlObject;
  class?: string;
  active?: boolean;
  subItems?: SingleSubItem[];
  MegaMenu?: JSX.Element;
};

interface MenuConfig {
  mainNav: SingleItemType[];
  mobileNav: SingleItemType[];
}
