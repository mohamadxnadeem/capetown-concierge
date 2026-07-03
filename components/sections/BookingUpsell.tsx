"use client";

import Link from "next/link";
import styled from "styled-components";
import SmartImage from "../common/SmartImage";
import { brand } from "../../lib/brand";
import { trackWhatsAppClick } from "../../lib/tracking";
import type { UpsellVehicle } from "../../lib/vehicles";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const IntroCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 22px;
  padding: 20px 22px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const IntroEyebrow = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const IntroHeading = styled.h2`
  margin: 0 0 6px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.4rem;
  line-height: 1.25;
`;

const IntroSub = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.98rem;
  line-height: 1.65;
`;

const Row = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 22px;
  padding: 20px 20px 22px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const RowHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`;

const RowTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.1rem;
`;

const Slider = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 82%;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 6px;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-auto-columns: 48%;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
    overflow: visible;
  }
`;

const Card = styled(Link)`
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.soft};
    border-color: rgba(11, 91, 51, 0.22);
  }
`;

const CardImage = styled.div`
  position: relative;
  height: 150px;
  background: ${({ theme }) => theme.colors.background};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 160px;
  }
`;

const CardBody = styled.div`
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const CardTitle = styled.span`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  font-size: 0.98rem;
  line-height: 1.25;
`;

const CardMeta = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
`;

const CardPrice = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 0.88rem;
  margin-top: 2px;
`;

const WhatsAppRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;

const WhatsAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 20px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.94rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

function formatZar(n?: number | null): string {
  if (!n || n <= 0) return "";
  return `R${Math.round(n).toLocaleString()}`;
}

function buildChauffeurWhatsapp(bookingRef: string) {
  const msg = `Hi ${brand.name}, I saw my booking ${bookingRef} and I'd like to add a chauffeur to my trip. Please share options. Thank you!`;
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

function VehicleCard({ vehicle }: { vehicle: UpsellVehicle }) {
  return (
    <Card href={`/chauffeur-hire/${vehicle.slug}`}>
      <CardImage>
        {vehicle.image ? (
          <SmartImage
            src={vehicle.image}
            alt={`${vehicle.title} — chauffeur hire in Cape Town`}
            sizes="(max-width: 768px) 82vw, 25vw"
          />
        ) : null}
      </CardImage>
      <CardBody>
        <CardTitle>{vehicle.title}</CardTitle>
        {vehicle.seats ? <CardMeta>{vehicle.seats} seats</CardMeta> : null}
        {vehicle.priceZar ? (
          <CardPrice>from {formatZar(vehicle.priceZar)} / day</CardPrice>
        ) : null}
      </CardBody>
    </Card>
  );
}

interface Props {
  bookingReference: string;
  hasVehicle: boolean;
  hasAccommodation: boolean;
  featuredVehicles: UpsellVehicle[];
}

export default function BookingUpsell({
  bookingReference,
  hasVehicle,
  hasAccommodation,
  featuredVehicles,
}: Props) {
  // Only render the "add a chauffeur" upsell for accommodation-only bookings.
  // Vehicle-only bookings no longer show the villas/hotels upsell.
  if (hasVehicle || !hasAccommodation) return null;

  const vehicles = featuredVehicles.slice(0, 6);
  if (vehicles.length === 0) return null;

  const wa = buildChauffeurWhatsapp(bookingReference);

  return (
    <Section>
      <IntroCard>
        <IntroEyebrow>Complete your trip</IntroEyebrow>
        <IntroHeading>
          Need a private chauffeur for your trip to Cape Town?
        </IntroHeading>
        <IntroSub>Add a chauffeured luxury vehicle for your stay.</IntroSub>
      </IntroCard>

      <Row>
        <RowHeader>
          <RowTitle>Featured vehicles</RowTitle>
          <Link
            href="/chauffeur-hire"
            style={{
              color: "#0b5b33",
              fontWeight: 700,
              fontSize: "0.88rem",
              textDecoration: "none",
            }}
          >
            See all →
          </Link>
        </RowHeader>
        <Slider>
          {vehicles.map((v) => (
            <VehicleCard key={v.slug} vehicle={v} />
          ))}
        </Slider>
      </Row>

      <WhatsAppRow>
        <WhatsAppButton
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackWhatsAppClick({
              source: "booking_upsell_chauffeur",
              label: bookingReference,
            })
          }
        >
          💬&nbsp; Enquire on WhatsApp
        </WhatsAppButton>
      </WhatsAppRow>
    </Section>
  );
}
