"use client";

import Link from "next/link";
import styled from "styled-components";
import Button from "../common/Button";
import Container from "../common/Container";
import { buildWhatsAppLink } from "../../lib/whatsapp";
import { trackWhatsAppClick } from "../../lib/tracking";

const AIRPORT_WA_MESSAGE =
  "Hi, I'd like a private airport transfer in Cape Town. My flight details are";

const Wrapper = styled.section`
  padding: 56px 0;
  background: ${({ theme }) => theme.colors.backgroundSoft};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 72px 0;
  }
`;

const Inner = styled.div`
  display: grid;
  gap: 24px;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1.4fr 1fr;
    gap: 40px;
  }
`;

const TextCol = styled.div``;

const Eyebrow = styled.div`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.8rem;
  line-height: 1.15;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.2rem;
  }
`;

const Text = styled.p`
  margin: 0 0 22px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.85;
`;

const PointRow = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 22px;
  display: grid;
  gap: 6px;
`;

const Point = styled.li`
  color: ${({ theme }) => theme.colors.heading};
  font-size: 0.95rem;
  padding-left: 22px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 2px;
    top: 8px;
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Anchor = styled.a`
  display: inline-flex;
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  display: inline-flex;
  text-decoration: none;
`;

const InfoCard = styled.div`
  padding: 24px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const InfoLabel = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 6px;
`;

const InfoRow = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1rem;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  strong {
    display: block;
    font-weight: 700;
    margin-bottom: 2px;
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.9rem;
  }
`;

export default function AirportTransfersTeaser() {
  return (
    <Wrapper>
      <Container>
        <Inner>
          <TextCol>
            <Eyebrow>Airport Transfers</Eyebrow>
            <Title>Private transfers to and from Cape Town International</Title>
            <Text>
              Your driver tracks the flight, meets you at Arrivals with a name board, and loads the luggage into the vehicle. One flat price, no surge, no shared runs.
            </Text>

            <PointRow>
              <Point>Meet-and-greet at CPT Arrivals</Point>
              <Point>Live flight tracking, no fee for delays</Point>
              <Point>Flat price per vehicle, quoted in writing</Point>
              <Point>Available 24 hours, including early and late flights</Point>
            </PointRow>

            <Actions>
              <StyledLink href="/airport-transfers-cape-town">
                <Button as="span">See Airport Transfer Options</Button>
              </StyledLink>
              <Anchor
                href={buildWhatsAppLink(AIRPORT_WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick({
                    source: "homepage_airport_teaser",
                    label: "Message About Airport Transfer",
                  })
                }
              >
                <Button as="span" $variant="secondary">
                  Get a Fare on WhatsApp
                </Button>
              </Anchor>
            </Actions>
          </TextCol>

          <InfoCard>
            <InfoLabel>What&apos;s Included</InfoLabel>
            <InfoRow>
              <strong>Named driver</strong>
              <span>PDP licensed, formally presented, tracks your flight.</span>
            </InfoRow>
            <InfoRow>
              <strong>Private vehicle</strong>
              <span>No other passengers. Choose sedan, SUV or people carrier.</span>
            </InfoRow>
            <InfoRow>
              <strong>Flat fare</strong>
              <span>Confirmed in writing before you fly. No surge pricing.</span>
            </InfoRow>
          </InfoCard>
        </Inner>
      </Container>
    </Wrapper>
  );
}
