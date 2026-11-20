import type { Metadata } from "next";
import { brand } from "../brand";
import {
  HTML_LANG,
  LOCALES,
  TRANSLATED_LOCALES,
  localeFromParam,
  withLocalePrefix,
  type Locale,
} from "./config";
import { translate, hasTranslation } from "./messages";
import { getStatus, isReviewed } from "./status";
import { getContent, localizedSlug, type ContentKind, KIND_SEGMENT } from "./slugs";

const SITE_URL = brand.siteUrl;

/** Public path of a page in a locale. `detail` carries the English slug of a tour or vehicle. */
export function localizedPath(
  locale: Locale,
  path: string,
  detail?: { kind: ContentKind; slug: string }
): string {
  if (detail) {
    const seg = KIND_SEGMENT[detail.kind];
    return withLocalePrefix(locale, `/${seg}/${localizedSlug(locale, detail.kind, detail.slug)}`);
  }
  return withLocalePrefix(locale, path);
}

type LocalizeOptions = {
  /** English path used for status and message lookups, e.g. "/tours" or "/tours/cape-peninsula-tour". */
  path: string;
  detail?: { kind: ContentKind; slug: string };
};

function hreflangMap(path: string, detail?: LocalizeOptions["detail"]) {
  const reviewed = TRANSLATED_LOCALES.filter((l) => isReviewed(l, path));
  if (reviewed.length === 0) return undefined;
  const languages: Record<string, string> = {
    en: `${SITE_URL}${localizedPath("en", path, detail)}`,
    "x-default": `${SITE_URL}${localizedPath("en", path, detail)}`,
  };
  for (const l of reviewed) {
    languages[HTML_LANG[l]] = `${SITE_URL}${localizedPath(l, path, detail)}`;
  }
  return languages;
}

/**
 * Turns the English metadata of a page into the metadata for `localeParam`.
 * English input is returned unchanged unless a translation of the page has been reviewed,
 * in which case only an hreflang block is added.
 */
export function localizeMetadata(
  base: Metadata,
  localeParam: string,
  { path, detail }: LocalizeOptions
): Metadata {
  const locale = localeFromParam(localeParam);
  const languages = hreflangMap(path, detail);

  if (locale === "en") {
    if (!languages) return base;
    return { ...base, alternates: { ...(base.alternates ?? {}), languages } };
  }

  const content = detail ? getContent(locale, detail.kind, detail.slug) : undefined;
  const key = path;
  const title =
    content?.meta?.title ||
    (hasTranslation(locale, "meta", `${key}:title`) ? translate(locale, "meta", `${key}:title`) : undefined);
  const description =
    content?.meta?.description ||
    (hasTranslation(locale, "meta", `${key}:description`)
      ? translate(locale, "meta", `${key}:description`)
      : undefined);

  const url = `${SITE_URL}${localizedPath(locale, path, detail)}`;
  const draft = getStatus(locale, path) !== "reviewed";

  const next: Metadata = {
    ...base,
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    robots: draft ? { index: false, follow: true } : base.robots,
  };

  if (base.openGraph) {
    next.openGraph = {
      ...base.openGraph,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      url,
      locale: HTML_LANG[locale].replace("-", "_"),
    } as Metadata["openGraph"];
  }
  if (base.twitter && (title || description)) {
    next.twitter = {
      ...base.twitter,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
    } as Metadata["twitter"];
  }
  return next;
}

export { LOCALES };
