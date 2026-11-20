"use client";

import styled from "styled-components";
import { useLocale, useT } from "../../lib/i18n/LocaleContext";

const Note = styled.p`
  margin: 0 0 18px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

/** Small note shown near reviews on translated pages. Renders nothing in English. */
export default function ReviewsNote() {
  const locale = useLocale();
  const tt = useT();
  if (locale === "en") return null;
  return <Note>{tt("reviews.translated-note")}</Note>;
}
