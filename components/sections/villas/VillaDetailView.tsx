"use client";

import Link from "next/link";
import styled from "styled-components";
import Container from "../../common/Container";
import SmartImage from "../../common/SmartImage";
import Money from "../../common/Money";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { brand } from "../../../lib/brand";
import {
  getVillaAreaDisplay,
  getVillaNightlyRate,
  getVillaPrimaryPhoto,
  type Villa,
} from "../../../lib/villas";

const Wrapper = styled.main`
  background: ${({ theme }) => theme.colors.background};
  padding-bottom: 80px;
`;

const HeroImage = styled.div`
  position: relative;
  width: 100%;
  height: 360px;
  background: ${({ theme }) => theme.colors.backgroundSoft};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 520px;
  }
`;

const ContentSection = styled.section`
  padding: 56px 0;
`;

const Layout = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: 48px;
  }
`;

const Eyebrow = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.15;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.6rem;
  }
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 18px;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.96rem;
`;

const MetaPill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.heading};
  font-size: 0.85rem;
  font-weight: 600;
`;

const Lead = styled.p`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.04rem;
  line-height: 1.8;
`;

const Body = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  line-height: 1.85;

  p {
    margin: 0 0 14px;
  }
`;

const FeatureSection = styled.section`
  margin-top: 32px;
`;

const FeatureTitle = styled.h2`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.3rem;
`;

const FeatureGrid = styled.ul`
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const FeatureItem = styled.li`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 12px 14px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;

  &::before {
    content: "✓";
    margin-right: 8px;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
  }
`;

const StickyAside = styled.aside`
  position: sticky;
  top: 100px;
  align-self: start;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 22px;
  padding: 24px 22px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const PriceLabel = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.84rem;
  margin-bottom: 4px;
`;

const PriceValue = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 14px;
`;

const WhatsAppButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 52px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.98rem;
  margin-bottom: 10px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const BookButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 52px;
  border-radius: 14px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 700;
  font-size: 0.98rem;
  margin-bottom: 10px;

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}08`};
  }
`;

const AsideNote = styled.p`
  margin: 12px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.86rem;
  line-height: 1.6;
`;

const CrossLinkRow = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr;
  margin-top: 32px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const CrossLinkCard = styled(Link)`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  padding: 18px 20px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};

  & strong {
    color: ${({ theme }) => theme.colors.primary};
  }

  & p {
    margin: 4px 0 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.92rem;
    line-height: 1.6;
  }
`;

interface Props {
  villa: Villa;
}

export default function VillaDetailView({ villa }: Props) {
  const photo = getVillaPrimaryPhoto(villa);
  const area = getVillaAreaDisplay(villa);
  const rate = getVillaNightlyRate(villa);

  const whatsappMessage = `Hi, I'd like to enquire about ${villa.name} in ${area}. Could you share availability?`;
  const whatsappHref = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const lead =
    villa.short_description ||
    `${villa.name} is a luxury villa in ${area} available through Cape Town Concierge.`;

  return (
    <Wrapper>
      {photo ? (
        <HeroImage>
          <SmartImage
            src={photo}
            alt={`${villa.name} — luxury villa in ${area}`}
            priority
            sizes="100vw"
          />
        </HeroImage>
      ) : null}

      <ContentSection>
        <Container>
          <Layout>
            <div>
              <Eyebrow>Luxury villa · {area}</Eyebrow>
              <Title>{villa.name}</Title>
              <MetaRow>
                {villa.bedrooms ? (
                  <MetaPill>{villa.bedrooms} bedrooms</MetaPill>
                ) : null}
                {villa.bathrooms ? (
                  <MetaPill>{villa.bathrooms} bathrooms</MetaPill>
                ) : null}
                {villa.max_guests ? (
                  <MetaPill>sleeps {villa.max_guests}</MetaPill>
                ) : null}
              </MetaRow>

              <Lead>{lead}</Lead>

              {villa.description ? (
                <Body dangerouslySetInnerHTML={{ __html: villa.description }} />
              ) : null}

              {villa.features?.length ? (
                <FeatureSection>
                  <FeatureTitle>Features</FeatureTitle>
                  <FeatureGrid>
                    {villa.features.map((f) => (
                      <FeatureItem key={f}>{f}</FeatureItem>
                    ))}
                  </FeatureGrid>
                </FeatureSection>
              ) : null}

              <CrossLinkRow>
                <CrossLinkCard href="/chauffeur-hire">
                  <strong>Add a chauffeur →</strong>
                  <p>
                    Daily and multi-day luxury chauffeur hire to pair with your
                    stay.
                  </p>
                </CrossLinkCard>
                <CrossLinkCard href="/tours">
                  <strong>Browse day tours →</strong>
                  <p>
                    Private Cape Point, Winelands, and Table Mountain
                    experiences.
                  </p>
                </CrossLinkCard>
              </CrossLinkRow>
            </div>

            <StickyAside>
              {rate ? (
                <>
                  <PriceLabel>From</PriceLabel>
                  <PriceValue>
                    <Money usd={rate} prefix="" suffix="/ night" />
                  </PriceValue>
                </>
              ) : (
                <PriceLabel>Rates available on enquiry</PriceLabel>
              )}
              {villa.nox_booking_url ? (
                <BookButton
                  href={villa.nox_booking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check availability & book →
                </BookButton>
              ) : null}
              <WhatsAppButton
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick({
                    source: "villa_detail",
                    label: villa.name,
                  })
                }
              >
                💬&nbsp; Enquire on WhatsApp
              </WhatsAppButton>
              <AsideNote>
                We typically respond within 30 minutes with availability and a
                quote.
              </AsideNote>
            </StickyAside>
          </Layout>
        </Container>
      </ContentSection>
    </Wrapper>
  );
}
