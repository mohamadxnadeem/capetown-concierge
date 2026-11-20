"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocaleContext } from "./LocaleProvider";
import {
  STATIC_PAGE_PATHS,
  isEnOnlyPath,
  localizePath,
  splitLocalePath,
  LOCALES,
  type Locale,
} from "../../lib/i18n/config";
import type { LocaleVersions } from "../../lib/i18n/seo";

/** Dynamic pages (tours, vehicles) call this to tell the header where they exist in each language. */
export function RegisterVersions({ versions }: { versions: LocaleVersions }) {
  const { setDynamicVersions } = useLocaleContext();
  const key = JSON.stringify(versions);
  useEffect(() => {
    setDynamicVersions(JSON.parse(key));
    return () => setDynamicVersions(null);
  }, [key, setDynamicVersions]);
  return null;
}

/** Where the current page exists in each language, or null when unknown (English-only pages). */
export function usePageVersions(): LocaleVersions | null {
  const { statuses, dynamicVersions } = useLocaleContext();
  const pathname = usePathname() || "/";
  const { path } = splitLocalePath(pathname);
  if (isEnOnlyPath(path)) return null;
  if ((STATIC_PAGE_PATHS as readonly string[]).includes(path)) {
    const out: LocaleVersions = {};
    for (const l of LOCALES as readonly Locale[]) {
      out[l] = {
        path: localizePath(l, path),
        status: l === "en" ? "reviewed" : statuses[l]?.[path] ?? "draft",
      };
    }
    return out;
  }
  return dynamicVersions;
}
