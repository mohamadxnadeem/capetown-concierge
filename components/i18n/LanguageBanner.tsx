"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocale, useT } from "./LocaleProvider";
import { usePageVersions } from "./PageVersions";
import { rememberChoice } from "./LanguageSwitcher";
import {
  CHOICE_COOKIE,
  HTML_LANG,
  SUGGEST_COOKIE,
  isRtl,
  localeFromPrefix,
  type Locale,
} from "../../lib/i18n/config";

export type BannerTexts = Record<string, { text: string; switch: string; stay: string; dismiss: string }>;

const Bar = styled.div`
  background: #fbf7ec;
  color: #123d2b;
  border-bottom: 1px solid #e3e8e5;
  padding: 10px 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
`;

const Action = styled.a`
  font-weight: 700;
  color: #0b5b33;
  text-decoration: underline;
  cursor: pointer;
  background: none;
  border: 0;
  font-size: inherit;
  padding: 0;
`;

function readCookie(name: string): string | null {
  const m = document.cookie.split("; ").find((c) => c.startsWith(name + "="));
  return m ? decodeURIComponent(m.slice(name.length + 1)) : null;
}

/** Dismissible first-visit suggestion. Never redirects. Only shown for a reviewed version. */
export function LanguageBanner({ texts }: { texts: BannerTexts }) {
  const locale = useLocale();
  const versions = usePageVersions();
  const [target, setTarget] = useState<Locale | null>(null);

  useEffect(() => {
    if (locale !== "en") return;
    if (readCookie(CHOICE_COOKIE)) return;
    const suggested = readCookie(SUGGEST_COOKIE);
    const l = suggested ? localeFromPrefix(suggested) : null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (l) setTarget(l);
  }, [locale]);

  if (locale !== "en" || !target || !versions) return null;
  const v = versions[target];
  if (!v || v.status !== "reviewed") return null;
  const copy = texts[target];
  if (!copy) return null;

  const close = (choice: string) => {
    rememberChoice(choice);
    setTarget(null);
  };

  return (
    <Bar role="region" lang={HTML_LANG[target]} dir={isRtl(target) ? "rtl" : "ltr"}>
      <span>{copy.text}</span>
      <Action href={v.path} onClick={() => rememberChoice(target)}>
        {copy.switch}
      </Action>
      <Action as="button" type="button" onClick={() => close("en")}>
        {copy.stay}
      </Action>
    </Bar>
  );
}

/** On a draft translation, always offer the way back to English. */
export function DraftNotice() {
  const locale = useLocale();
  const t = useT();
  const versions = usePageVersions();
  if (locale === "en" || !versions) return null;
  if (versions[locale]?.status === "reviewed" || !versions.en) return null;
  return (
    <Bar>
      <Action href={versions.en.path} lang="en" hrefLang="en" onClick={() => rememberChoice("en")}>
        {t("switcher.backToEnglish")}
      </Action>
    </Bar>
  );
}
