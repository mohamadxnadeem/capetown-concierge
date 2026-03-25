"use client";

import styled from "styled-components";
import Link from "next/link";
import {
  buildWhatsAppLink,
  buildGeneralWhatsAppMessage,
} from "../../../lib/whatsapp";

export const whatsappLink = buildWhatsAppLink(
  buildGeneralWhatsAppMessage("planning a private wine tour in Cape Town")
);

export const PageWrap = styled.main`
  background: ${({ theme }) => theme.colors.background};
`;

export const Container = styled.div`
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: min(1180px, calc(100% - 64px));
  }
`;

export const Section = styled.section`
  padding: 72px 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 84px 0;
  }
`;

export const SectionHeader = styled.div`
  max-width: 820px;
  margin-bottom: 28px;
`;

export const SectionEyebrow = styled.div`
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.08;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.35rem;
  }
`;

export const SectionText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.85;
  font-size: 1rem;
`;

export const Anchor = styled.a`
  display: inline-flex;
  text-decoration: none;
`;

export const StyledLink = styled(Link)`
  display: inline-flex;
  text-decoration: none;
`;

export const ValueStrip = styled.div`
  margin-top: 28px;
  padding: 18px 20px;
  border-radius: 18px;
  background: linear-gradient(
    135deg,
    rgba(11, 91, 51, 0.08) 0%,
    rgba(6, 62, 35, 0.04) 100%
  );
  border: 1px solid rgba(11, 91, 51, 0.12);
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const ValueItem = styled.div`
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: ${({ theme }) => theme.colors.heading};
  font-size: 0.84rem;
  font-weight: 700;
`;

export const InfoCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 22px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;