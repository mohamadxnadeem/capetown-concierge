"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "../i18n/LocaleProvider";
import { localizePath } from "../../lib/i18n/config";

type Props = ComponentProps<typeof NextLink>;

/**
 * Drop-in replacement for next/link that adds the current language prefix to
 * internal paths. English paths and English-only routes are left unchanged.
 */
export default function LocaleLink({ href, ...rest }: Props) {
  const locale = useLocale();
  const finalHref = typeof href === "string" ? localizePath(locale, href) : href;
  return <NextLink href={finalHref} {...rest} />;
}
