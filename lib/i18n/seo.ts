import type { Metadata } from "next";
import { brand } from "../brand";
import {
  DEFAULT_LOCALE,
  HTML_LANG,
  LOCALES,
  OG_LOCALE,
  localizePath,
  type Locale,
} from "./config";
import { getMetaMessages, getPageStatus, type PageStatus } from "./messages";

export const SITE_URL = brand.siteUrl;
export const OG_IMAGE = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

/** Where a page exists in each language, and its review status. */
export type LocaleVersions = Partial<
  Record<Locale, { path: string; status: PageStatus }>
>;

/** Versions of a hardcoded page. `path` is the English path, e.g. "/tours". */
export function staticVersions(path: string): LocaleVersions {
  const out: LocaleVersions = {};
  for (const l of LOCALES) {
    out[l] = { path: localizePath(l, path), status: getPageStatus(l, path) };
  }
  return out;
}

export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/** hreflang map: reviewed versions plus the current page, plus x-default (English). */
export function buildLanguageAlternates(
  versions: LocaleVersions,
  current: Locale
): Record<string, string> | undefined {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    const v = versions[l];
    if (!v) continue;
    if (v.status === "reviewed" || l === current) {
      languages[HTML_LANG[l]] = absoluteUrl(v.path);
    }
  }
  if (versions.en) languages["x-default"] = absoluteUrl(versions.en.path);
  return Object.keys(languages).length > 2 ? languages : undefined;
}

export function isIndexable(locale: Locale, versions: LocaleVersions): boolean {
  if (locale === DEFAULT_LOCALE) return true;
  return versions[locale]?.status === "reviewed";
}

export type BuildMetadataInput = {
  locale: Locale;
  versions: LocaleVersions;
  title: string;
  description: string;
  keywords?: string[];
  ogAlt?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  /** Force noindex regardless of status. */
  noindex?: boolean;
};

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const { locale, versions, title, description } = input;
  const self = versions[locale];
  const url = absoluteUrl(self?.path ?? "/");
  const indexable = !input.noindex && isIndexable(locale, versions);
  const image = input.ogImage || OG_IMAGE;
  const languages = indexable ? buildLanguageAlternates(versions, locale) : undefined;
  return {
    title,
    description,
    keywords: input.keywords,
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    robots: indexable
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: brand.name,
      type: input.ogType ?? "website",
      locale: OG_LOCALE[locale],
      images: [
        { url: image, width: 1200, height: 630, alt: input.ogAlt ?? brand.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/**
 * Metadata for a hardcoded page. Title, description and OG alt come from
 * messages/<locale>/meta.json under `<metaKey>.title` etc.
 */
export function pageMetadata(
  locale: Locale,
  path: string,
  metaKey: string,
  extra: { keywords?: string[] } = {}
): Metadata {
  const m = getMetaMessages(locale);
  return buildMetadata({
    locale,
    versions: staticVersions(path),
    title: m[`${metaKey}.title`],
    description: m[`${metaKey}.description`],
    ogAlt: m[`${metaKey}.ogAlt`],
    keywords: extra.keywords,
  });
}
