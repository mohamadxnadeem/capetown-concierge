"use client";

import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { trackWhatsAppClick } from "../../../lib/tracking";
import Button from "../../common/Button";
import { RelatedTour } from "./types";

function shimmer(w: number, h: number) {
  return `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f2f4f3" offset="20%" />
          <stop stop-color="#e8ece9" offset="50%" />
          <stop stop-color="#f2f4f3" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f2f4f3" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite" />
    </svg>`;
}

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

/* ===== styles unchanged ===== */

const SectionHeader = styled.div`
  max-width: 760px;
  margin-bottom: 28px;
`;

const SectionEyebrow = styled.div`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const SectionTitle = styled.h2`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.08;
`;

const SectionText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

const OfferCard = styled.div`
  margin-bottom: 26px;
  background: linear-gradient(
    135deg,
    rgba(11, 91, 51, 0.08) 0%,
    rgba(6, 62, 35, 0.04) 100%
  );
  border: 1px solid rgba(11, 91, 51, 0.12);
  border-radius: 20px;
  padding: 28px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const OfferTitle = styled.h3`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.45rem;
`;

const OfferText = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
  max-width: 760px;
`;

const OfferCta = styled.a`
  display: inline-flex;
  text-decoration: none;
`;

const Grid = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const CardImage = styled.div`
  position: relative;
  min-height: 220px;
  background: linear-gradient(135deg, rgba(11, 91, 51, 0.12), rgba(6, 62, 35, 0.06));
`;

const CardBody = styled.div`
  padding: 22px;
`;

const CardTitle = styled.h3`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.2rem;
`;

const CardText = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
`;

type Props = {
  items: RelatedTour[];
  bundleWhatsappLink: string;
};

const TOUR_COPY: Record<string, string> = {
  "Cape Peninsula Private Tour": "Two oceans, wild penguins, and the most dramatic coastal drive in Africa. All in one fully private day.",
  "City and Table Mountain Tour": "Cape Town's most iconic landmarks explored privately — Table Mountain, Bo-Kaap, Camps Bay and the Waterfront.",
  "Romantic Stellenbosch Winelands Experience": "A private drive through South Africa's most celebrated wine country — rolling vineyards, Cape Dutch estates, and world-class tastings.",
  "Sunset Safari Day Trip": "The Big 5, golden-hour game drives, and a full day at Aquila Private Game Reserve — private transport and meals included.",
};

export default function PrivateTourRelatedTours({
  items,
  bundleWhatsappLink,
}: Props) {
  if (!items.length) return null;

  return (
    <>
      <SectionHeader>
        <SectionEyebrow>More Experiences</SectionEyebrow>
        <SectionTitle>More of Cape Town, Done Privately</SectionTitle>
        <SectionText>
          Every tour is fully private, chauffeur-driven, and built around your schedule. Explore more — or bundle three tours and ask us about a group rate.
        </SectionText>
      </SectionHeader>

      <OfferCard>
        <OfferTitle>Bundle &amp; Save</OfferTitle>
        <OfferText>
          Book any 3 private tours together and ask us about a group rate. It’s the perfect option for travellers who want to see more of Cape Town without compromising on comfort or flexibility.
        </OfferText>

        <OfferCta
          href={bundleWhatsappLink}
          target="_blank"
          onClick={() => trackWhatsAppClick({ source: "related_tours_bundle", label: "Get 3-Tour Offer on WhatsApp" })}
        >
          <Button as="span">Get 3-Tour Offer on WhatsApp</Button>
        </OfferCta>
      </OfferCard>

      <Grid>
        {items.map((item, index) => (
          <Card key={`${item.title}-${index}`}>
            <CardImage>
              {item.image ? (
                <Image
                  src={item.image}
                  alt={`${item.title} private tour`}
                  fill
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 500)
                  )}`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              ) : null}
            </CardImage>

            <CardBody>
              <CardTitle>{item.title}</CardTitle>

              <CardText>
                {TOUR_COPY[item.title] || item.description || "Discover another premium private tour experience in Cape Town."}
              </CardText>

              <Link href={item.href}>
                <Button as="span" $variant="secondary">
                  View Tour
                </Button>
              </Link>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </>
  );
}