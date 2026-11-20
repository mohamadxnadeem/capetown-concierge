"use client";

import styled from "styled-components";
import { useLocale } from "./LocaleProvider";
import { usePageVersions } from "./PageVersions";
import { useT } from "./LocaleProvider";
import { CHOICE_COOKIE, HTML_LANG, LANGUAGE_NAMES, LOCALES, type Locale } from "../../lib/i18n/config";

export function rememberChoice(value: string) {
  document.cookie = `${CHOICE_COOKIE}=${encodeURIComponent(value)}; path=/; max-age=31536000; samesite=lax`;
}

const List = styled.nav<{ $inline?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
`;

const Item = styled.a<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 10px;
  border-radius: 10px;
  font-size: 0.82rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, ${({ $active }) => ($active ? 0.5 : 0.18)});
  background: rgba(255, 255, 255, ${({ $active }) => ($active ? 0.2 : 0.08)});
  &:hover {
    background: rgba(255, 255, 255, 0.22);
  }
`;

/**
 * Links to the same page in every language that has a reviewed version.
 * The current language is always shown, and so is English, so a draft page
 * always has a way back.
 */
export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useT();
  const versions = usePageVersions();
  if (!versions) return null;
  const shown = (LOCALES as readonly Locale[]).filter((l) => {
    const v = versions[l];
    if (!v) return false;
    return l === "en" || l === locale || v.status === "reviewed";
  });
  if (shown.length < 2) return null;
  return (
    <List aria-label={t("switcher.label")}>
      {shown.map((l) => (
        // Plain anchor on purpose: switching language is a full page load.
        <Item
          key={l}
          href={versions[l]!.path}
          lang={HTML_LANG[l]}
          hrefLang={HTML_LANG[l]}
          $active={l === locale}
          aria-current={l === locale ? "true" : undefined}
          onClick={() => rememberChoice(l)}
        >
          {LANGUAGE_NAMES[l]}
        </Item>
      ))}
    </List>
  );
}
