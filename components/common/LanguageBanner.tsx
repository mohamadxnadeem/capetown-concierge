"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ENGLISH_ONLY_SEGMENTS,
  type Locale,
  type TranslatedLocale,
} from "../../lib/i18n/config";
import { useLocale } from "../../lib/i18n/LocaleContext";
import { parsePath, pathFor } from "./LanguageSwitcher";
import { CHOICE_COOKIE, SUGGEST_COOKIE } from "../../lib/i18n/suggest";

const COPY: Record<TranslatedLocale, { text: string; accept: string; stay: string; close: string; dir: "ltr" | "rtl" }> = {
  ru: {
    text: "Этот сайт доступен на русском языке.",
    accept: "Перейти на русский",
    stay: "Остаться на английском",
    close: "Закрыть",
    dir: "ltr",
  },
  "pt-BR": {
    text: "Este site está disponível em português.",
    accept: "Ir para o português",
    stay: "Continuar em inglês",
    close: "Fechar",
    dir: "ltr",
  },
  ar: {
    text: "هذا الموقع متاح باللغة العربية.",
    accept: "الانتقال إلى العربية",
    stay: "البقاء على الإنجليزية",
    close: "إغلاق",
    dir: "rtl",
  },
};

const Bar = styled.div`
  position: fixed;
  z-index: 998;
  /* Sits above the floating WhatsApp button (24px + about 50px tall) and never pushes content. */
  bottom: 88px;
  left: 12px;
  right: 12px;
  margin: 0 auto;
  max-width: 560px;
  box-sizing: border-box;
  padding: 14px 40px 14px 16px;
  border-radius: 18px;
  background: rgba(6, 32, 18, 0.97);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45), 0 4px 16px rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.88rem;
  line-height: 1.35;
  font-weight: 600;

  &[dir="rtl"] {
    padding: 14px 16px 14px 40px;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const Primary = styled.button`
  height: 38px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
  color: #fff;
  font: inherit;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
`;

const Secondary = styled(Primary)`
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
`;

const Close = styled.button`
  position: absolute;
  top: 8px;
  inset-inline-end: 8px;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

function readCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : null;
}

function remember(value: Locale) {
  document.cookie = `${CHOICE_COOKIE}=${value}; path=/; max-age=31536000; SameSite=Lax`;
  document.cookie = `${SUGGEST_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

function track(action: string, locale: string) {
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  w.gtag?.("event", "language_banner", { action, suggested_locale: locale });
}

/**
 * First-visit language suggestion. proxy.ts sets the short-lived ctc_lang_suggest cookie only for
 * real browsers with no saved choice, so cached HTML is identical for everyone and bots never
 * see the banner. Rendered after mount only, as a fixed overlay (no layout shift).
 */
export default function LanguageBanner() {
  const locale = useLocale();
  const [target, setTarget] = useState<TranslatedLocale | null>(null);

  useEffect(() => {
    if (locale !== "en") return;
    if (readCookie(CHOICE_COOKIE)) return;
    const s = readCookie(SUGGEST_COOKIE);
    if (s !== "ar" && s !== "pt-BR" && s !== "ru") return;
    const first = window.location.pathname.split("/").filter(Boolean)[0];
    if (first && ENGLISH_ONLY_SEGMENTS.includes(first)) return;
    const timer = window.setTimeout(() => {
      setTarget(s);
      track("shown", s);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [locale]);

  if (!target) return null;
  const c = COPY[target];

  const dismiss = (action: "dismiss") => {
    track(action, target);
    remember("en");
    setTarget(null);
  };
  const accept = () => {
    track("accept", target);
    remember(target);
    const { englishPath } = parsePath(window.location.pathname);
    window.location.assign(pathFor(target, englishPath) + window.location.search + window.location.hash);
  };

  return (
    <Bar role="region" aria-label={c.text} dir={c.dir} lang={target}>
      <div>{c.text}</div>
      <Actions>
        <Primary type="button" onClick={accept}>{c.accept}</Primary>
        <Secondary type="button" onClick={() => dismiss("dismiss")}>{c.stay}</Secondary>
      </Actions>
      <Close type="button" aria-label={c.close} onClick={() => dismiss("dismiss")}>×</Close>
    </Bar>
  );
}
