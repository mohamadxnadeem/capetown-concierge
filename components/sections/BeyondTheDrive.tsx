"use client";

import Link from "next/link";
import styled from "styled-components";
import Button from "../common/Button";
import Container from "../common/Container";
import { buildWhatsAppLink } from "../../lib/whatsapp";
import { trackWhatsAppClick } from "../../lib/tracking";

const BEYOND_WA_MESSAGE =
  "Hi, my chauffeur is booked. Can you also help me arrange";

const Wrapper = styled.section`
  padding: 72px 0;
  background: ${({ theme }) => theme.colors.background};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 96px 0;
  }
`;

const Intro = styled.div`
  max-width: 780px;
  margin: 0 0 36px;
`;

const Eyebrow = styled.div`
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.08;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.6rem;
  }
`;

const Text = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.85;
`;

const Grid = styled.div`
  display: grid;
  gap: 14px;
  margin-bottom: 28px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Card = styled.div`
  padding: 22px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const CardTitle = styled.h3`
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.05rem;
`;

const CardText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
  line-height: 1.7;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const StyledLink = styled(Link)`
  display: inline-flex;
  text-decoration: none;
`;

const Anchor = styled.a`
  display: inline-flex;
  text-decoration: none;
`;

const items = [
  {
    title: "Restaurant reservations",
    body: "Tables at the places we send guests back to. We handle the booking and share directions with your driver.",
  },
  {
    title: "Activities and experiences",
    body: "Helicopter loops from the Waterfront, ziplining in Constantia, shark cage diving. We book the slot, your chauffeur handles the timing.",
  },
  {
    title: "Safari day trips",
    body: "Aquila for a Big Five day out. We arrange the reserve and drive you there and back.",
  },
  {
    title: "Boat and yacht charters",
    body: "Sunset cruising along the Atlantic Seaboard, or a full-day private charter. Booked through our own contacts.",
  },
  {
    title: "Villas",
    body: "Hand-picked villas in Camps Bay, Clifton, Constantia and the Winelands. Full details on the villas page.",
  },
];

export default function BeyondTheDrive() {
  return (
    <Wrapper>
      <Container>
        <Intro>
          <Eyebrow>The Concierge Side</Eyebrow>
          <Title>Beyond the drive</Title>
          <Text>
            Your chauffeur is the practical part. The rest is arranged around it. Restaurant reservations, safari days, villas, boat charters, whatever the trip needs. One WhatsApp thread, one person coordinating, no chasing three suppliers from a hotel room.
          </Text>
        </Intro>

        <Grid>
          {items.map((item) => (
            <Card key={item.title}>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.body}</CardText>
            </Card>
          ))}
        </Grid>

        <Actions>
          <StyledLink href="/villas">
            <Button as="span">Browse Villas</Button>
          </StyledLink>
          <Anchor
            href={buildWhatsAppLink(BEYOND_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                source: "homepage_beyond_the_drive",
                label: "Message About Concierge Extras",
              })
            }
          >
            <Button as="span" $variant="secondary">
              Ask on WhatsApp
            </Button>
          </Anchor>
        </Actions>
      </Container>
    </Wrapper>
  );
}
