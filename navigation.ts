import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales } from "./localeConfigs";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales /* ... */ });
