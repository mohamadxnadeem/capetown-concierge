"use client";

import Link from "next/link";
import styled from "styled-components";
import { buildWhatsAppLink, buildGeneralWhatsAppMessage } from "../../../lib/whatsapp";

export const whatsappLink = buildWhatsAppLink(
  buildGeneralWhatsAppMessage("planning the best activities to do in Cape Town")
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
`;

export const SectionHeader = styled.div`
  max-width: 820px;
  margin-bottom: 28px;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.08;
`;

export const SectionText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.85;
`;

export const Anchor = styled.a`
  display: inline-flex;
  text-decoration: none;
`;

export const StyledLink = styled(Link)`
  display: inline-flex;
  text-decoration: none;
`;