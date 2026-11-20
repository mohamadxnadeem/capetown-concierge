"use client";

import Link from "../../components/common/LocaleLink";
import styled from "styled-components";
import { useT } from "../../components/i18n/LocaleProvider";

const Wrap = styled.main`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 64px 24px;
  background: #f6f8f7;
`;

const Eyebrow = styled.p`
  margin: 0 0 12px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0b5b33;
`;

const Title = styled.h1`
  margin: 0 0 16px;
  font-size: 2rem;
  color: #123d2b;
  line-height: 1.1;
`;

const Body = styled.p`
  margin: 0 0 32px;
  color: #6c7a74;
  line-height: 1.8;
  max-width: 480px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Primary = styled(Link)`
  padding: 12px 24px;
  border-radius: 10px;
  background: #0b5b33;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
`;

const Secondary = styled(Link)`
  padding: 12px 24px;
  border-radius: 10px;
  background: white;
  color: #123d2b;
  font-weight: 700;
  font-size: 0.9rem;
  border: 1px solid #e3e8e5;
  text-decoration: none;
`;

export default function NotFound() {
  const t = useT();
  return (
    <Wrap>
      <Eyebrow>{t("notFound.eyebrow")}</Eyebrow>
      <Title>{t("notFound.title")}</Title>
      <Body>{t("notFound.body")}</Body>
      <Actions>
        <Primary href="/">{t("notFound.home")}</Primary>
        <Secondary href="/tours">{t("notFound.tours")}</Secondary>
      </Actions>
    </Wrap>
  );
}
