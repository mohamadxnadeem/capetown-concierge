"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import {
  ENGLISH_ONLY_SEGMENTS,
  LOCALES,
  LOCALE_LABEL,
  LOCALE_PREFIX,
  LOCALE_SHORT,
  withLocalePrefix,
  type Locale,
} from "../../lib/i18n/config";
import { useLocale, useT } from "../../lib/i18n/LocaleContext";
import { isReviewed } from "../../lib/i18n/status";
import { englishSlugFor, localizedSlug, type ContentKind } from "../../lib/i18n/slugs";

const Wrap = styled.div`
  position: relative;
`;

// Same glass pill as the currency selector so the header stays consistent.
const Pill = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 38px;
  padding: 0 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.35);
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.6);
    outline-offset: 2px;
  }
`;

const Panel = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 9999;
  min-width: 150px;
  border-radius: 14px;
  background: rgba(6, 32, 18, 0.97);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
  overflow: hidden;
  padding: 6px 0;
`;

const Option = styled(Link)<{ $active?: boolean }>`
  display: block;
  padding: 10px 16px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  background: ${({ $active }) => ($active ? "rgba(255, 255, 255, 0.1)" : "transparent")};

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const SLUG_KINDS: Record<string, ContentKind> = {
  tours: "tours",
  "chauffeur-hire": "vehicles",
};

/** Splits a browser path into its locale and the English path of the page. */
function parsePath(pathname: string): { locale: Locale; englishPath: string } {
  const parts = pathname.split("/").filter(Boolean);
  let locale: Locale = "en";
  if (parts.length) {
    const found = LOCALES.find((l) => l !== "en" && LOCALE_PREFIX[l] === parts[0].toLowerCase());
    if (found) {
      locale = found;
      parts.shift();
    }
  }
  const kind = SLUG_KINDS[parts[0] ?? ""];
  if (kind && parts[1]) parts[1] = englishSlugFor(locale, kind, parts[1]).toLowerCase();
  return { locale, englishPath: "/" + parts.join("/") };
}

function pathFor(target: Locale, englishPath: string): string {
  const parts = englishPath.split("/").filter(Boolean);
  const kind = SLUG_KINDS[parts[0] ?? ""];
  if (kind && parts[1]) parts[1] = localizedSlug(target, kind, parts[1]);
  return withLocalePrefix(target, "/" + parts.join("/"));
}

/**
 * Only offers languages that are reviewed for the current page. On an English page with no
 * reviewed translation nothing is rendered, so the English site is visually unchanged.
 * A draft page in another language still offers English.
 */
export default function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const current = useLocale();
  const t = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const { englishPath } = parsePath(pathname);
  const first = englishPath.split("/").filter(Boolean)[0];
  if (first && ENGLISH_ONLY_SEGMENTS.includes(first)) return null;

  const others = LOCALES.filter(
    (l) => l !== current && (l === "en" || isReviewed(l, englishPath))
  );
  if (others.length === 0) return null;

  const options: Locale[] = [current, ...others].sort(
    (a, b) => LOCALES.indexOf(a) - LOCALES.indexOf(b)
  );

  return (
    <Wrap ref={ref}>
      <Pill
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("switcher.label")}
        onClick={() => setOpen((v) => !v)}
      >
        {LOCALE_SHORT[current]}
      </Pill>
      {open ? (
        <Panel role="listbox" aria-label={t("switcher.label")}>
          {options.map((l) => (
            <Option
              key={l}
              href={pathFor(l, englishPath)}
              hrefLang={l}
              lang={l}
              $active={l === current}
              onClick={() => setOpen(false)}
            >
              {LOCALE_LABEL[l]}
            </Option>
          ))}
        </Panel>
      ) : null}
    </Wrap>
  );
}
