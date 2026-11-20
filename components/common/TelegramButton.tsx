"use client";

import styled from "styled-components";
import { useLocale, useT } from "../i18n/LocaleProvider";
import { getTelegramLink } from "../../lib/whatsapp";

const Btn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 18px;
  border-radius: 14px;
  background: #229ed9;
  color: white;
  font-weight: 700;
  text-decoration: none;
  &:hover {
    filter: brightness(1.08);
  }
`;

/**
 * Telegram button for Russian pages only. Shows the word "Telegram" and an
 * icon, never the number. Hidden when NEXT_PUBLIC_TELEGRAM_LINK is empty.
 */
export default function TelegramButton({ source }: { source: string }) {
  const locale = useLocale();
  const t = useT();
  const href = getTelegramLink();
  if (locale !== "ru" || !href) return null;
  return (
    <Btn
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-source={source}
      onClick={() => {
        if (typeof window !== "undefined") {
          window.gtag?.("event", "telegram_click", { source });
        }
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
      </svg>
      {t("telegram.label")}
    </Btn>
  );
}
