"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled, { keyframes, css } from "styled-components";
import {
  ENGLISH_ONLY_SEGMENTS,
  LOCALES,
  LOCALE_LABEL,
  LOCALE_PREFIX,
  LOCALE_SHORT,
  withLocalePrefix,
  type Locale,
} from "../../lib/i18n/config";
import { useLocale, useT, useTl } from "../../lib/i18n/LocaleContext";
import { useMobilePanelTop } from "../../lib/useMobilePanel";
import { englishSlugFor, localizedSlug, type ContentKind } from "../../lib/i18n/slugs";

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-6px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

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
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
  white-space: nowrap;
  backdrop-filter: blur(6px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.35);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.6);
    outline-offset: 2px;
  }
`;

const Globe = styled.span`
  font-size: 1.15rem;
  line-height: 1;

  @media (max-width: 767px) {
    display: none;
  }
`;

const Code = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
`;

const Chevron = styled.span<{ $open: boolean }>`
  font-size: 0.6rem;
  opacity: 0.75;
  transition: transform 0.2s ease;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};

  @media (max-width: 767px) {
    display: none;
  }
`;

const Wrap = styled.div`
  position: relative;
`;

const Panel = styled.div<{ $visible: boolean; $fixedTop?: number | null }>`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 9999;
  width: 260px;

  ${({ $fixedTop }) =>
    $fixedTop != null &&
    css`
      position: fixed;
      top: ${$fixedTop}px;
      left: 12px;
      right: 12px;
      width: auto;
      max-width: none;
      max-height: calc(100dvh - ${$fixedTop}px - 12px);
      overflow-y: auto;
      z-index: 10000;
    `}
  border-radius: 18px;
  background: rgba(6, 32, 18, 0.97);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.45),
    0 4px 16px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  overflow: hidden;
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};

  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${slideDown} 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
    `}
`;

const PanelHeader = styled.div`
  padding: 14px 16px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`;

const PanelTitle = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
`;

const OptionList = styled.div`
  padding: 8px 0;
`;

const OptionRow = styled(Link)<{ $active: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  padding: 10px 16px;
  background: ${({ $active }) =>
    $active ? "rgba(11, 91, 51, 0.35)" : "transparent"};
  border: none;
  cursor: pointer;
  transition: background 0.15s ease;
  text-align: start;
  text-decoration: none;

  &:hover {
    background: ${({ $active }) =>
      $active ? "rgba(11, 91, 51, 0.45)" : "rgba(255, 255, 255, 0.06)"};
  }

  &:focus-visible {
    outline: none;
    background: rgba(255, 255, 255, 0.08);
  }
`;

const RowName = styled.div`
  flex: 1;
  min-width: 0;
  font-size: 0.88rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.2;
`;

const RowShort = styled.div`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
`;

const ActiveDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 6px rgba(74, 222, 128, 0.7);
`;

const SLUG_KINDS: Record<string, ContentKind> = {
  tours: "tours",
  "chauffeur-hire": "vehicles",
};

/** Splits a browser path into its locale and the English path of the page. */
export function parsePath(pathname: string): { locale: Locale; englishPath: string } {
  const parts = pathname.split("/").filter(Boolean);
  let locale: Locale = "en";
  // Server rendering can see the internal /en/... path that English pages are rewritten to.
  if (parts[0] === "en") parts.shift();
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

export function pathFor(target: Locale, englishPath: string): string {
  const parts = englishPath.split("/").filter(Boolean);
  const kind = SLUG_KINDS[parts[0] ?? ""];
  if (kind && parts[1]) parts[1] = localizedSlug(target, kind, parts[1]);
  return withLocalePrefix(target, "/" + parts.join("/"));
}

const COOKIE = "ctc_lang_choice";

function rememberChoice(locale: Locale) {
  document.cookie = `${COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

/**
 * Language button that sits next to the currency selector. Always lists all four languages
 * (draft ones stay noindex, handled elsewhere) and links to the same page in each language.
 */
export default function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const current = useLocale();
  const t = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tl = useTl();
  const mobileTop = useMobilePanelTop(open, ref);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (ref.current?.contains(target) || panelRef.current?.contains(target)) return;
      setOpen(false);
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
  // English-only pages (booking, driver, ...) have no translated version to link to.
  if (first && ENGLISH_ONLY_SEGMENTS.includes(first)) return null;

  const label = t("switcher.label") || "Language";

  const panel = (
    <Panel ref={panelRef} $visible={open} $fixedTop={mobileTop} role="listbox" aria-label={label}>
      <PanelHeader>
        <PanelTitle>{tl("Select Language")}</PanelTitle>
      </PanelHeader>
      <OptionList>
        {LOCALES.map((l) => (
          <OptionRow
            key={l}
            href={pathFor(l, englishPath)}
            hrefLang={l}
            lang={l}
            role="option"
            aria-selected={l === current}
            $active={l === current}
            tabIndex={open ? 0 : -1}
            onClick={() => {
              rememberChoice(l);
              setOpen(false);
            }}
          >
            <RowName>{LOCALE_LABEL[l]}</RowName>
            {l === current ? <ActiveDot /> : <RowShort>{LOCALE_SHORT[l]}</RowShort>}
          </OptionRow>
        ))}
      </OptionList>
    </Panel>
  );

  return (
    <Wrap ref={ref}>
      <Pill
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`${label}: ${LOCALE_LABEL[current]}`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe aria-hidden="true">🌐</Globe>
        <Code>{LOCALE_SHORT[current]}</Code>
        <Chevron $open={open}>▼</Chevron>
      </Pill>

      {open && (mobileTop != null ? createPortal(panel, document.body) : panel)}
    </Wrap>
  );
}
