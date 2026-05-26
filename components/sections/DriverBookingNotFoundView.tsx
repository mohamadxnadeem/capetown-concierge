"use client";

import styled from "styled-components";
import { brand } from "../../lib/brand";

const Wrapper = styled.main`
  background: ${({ theme }) => theme.colors.background};
  min-height: calc(100vh - 82px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
`;

const Card = styled.div`
  width: min(540px, 100%);
  padding: 44px 36px;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 32px 22px;
  }
`;

const Eyebrow = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const Heading = styled.h1`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.6rem;
  line-height: 1.25;
`;

const Body = styled.p`
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
  line-height: 1.7;
`;

const Reference = styled.code`
  display: inline-block;
  margin-top: 10px;
  padding: 4px 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.heading};
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.95rem;
  word-break: break-all;
`;

interface Props {
  reference: string;
}

export default function DriverBookingNotFoundView({ reference }: Props) {
  return (
    <Wrapper>
      <Card>
        <Eyebrow>{brand.name} · Driver</Eyebrow>
        <Heading>Booking not found</Heading>
        <Body>
          This booking link is invalid or has expired. Please contact your
          dispatcher.
        </Body>
        {reference && reference !== "—" ? (
          <Reference>{reference}</Reference>
        ) : null}
      </Card>
    </Wrapper>
  );
}
