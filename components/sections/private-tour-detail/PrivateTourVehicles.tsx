"use client";

import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Button from "../../common/Button";
import SmartImage from "../../common/SmartImage";
import { TourVehicle } from "./types";
import {
  buildWhatsAppLink,
  buildVehicleForTourWhatsAppMessage,
} from "../../../lib/whatsapp";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { useCurrency } from "../../../context/CurrencyContext";

import { useT } from "../../../lib/i18n/LocaleContext";
import type { TFunction } from "../../../lib/i18n/messages";
type Props = {
  items: TourVehicle[];
  tourTitle: string;
  title?: string;
};


const cinematicPan = keyframes`
  0% {
    transform: scale(1.01) translate3d(0%, 0%, 0);
  }
  50% {
    transform: scale(1.04) translate3d(-0.8%, -0.4%, 0);
  }
  100% {
    transform: scale(1.06) translate3d(-1.4%, -0.7%, 0);
  }
`;

const SectionHeader = styled.div`
  max-width: 760px;
  margin-bottom: 24px;
`;

const SectionEyebrow = styled.div`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const SectionTitle = styled.h2`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.08;
`;

const SectionText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

const ValueStrip = styled.div`
  margin-bottom: 26px;
  padding: 16px 18px;
  border-radius: 16px;
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

const ValueItem = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.heading};
`;

const CarouselWrap = styled.div`
  position: relative;
`;

const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 16px;
`;

const ArrowButton = styled.button`
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.heading};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.card};
  }
`;

const Slider = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 18px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0 0 8px;

  grid-auto-columns: 82%;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-auto-columns: 62%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-auto-columns: 44%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-auto-columns: 34%;
  }
`;

const Card = styled.div`
  width: 100%;
  scroll-snap-align: start;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.card};
    border-color: rgba(11, 91, 51, 0.18);
  }
`;

const CardImage = styled.div`
  position: relative;
  min-height: 220px;
  background: linear-gradient(135deg, rgba(11, 91, 51, 0.12), rgba(6, 62, 35, 0.06));
  overflow: hidden;
`;

const ImageLayer = styled.div`
  position: absolute;
  inset: 0;
  animation: ${cinematicPan} 10s ease-in-out forwards;
`;

const ImageOverlay = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.12) 0%,
    rgba(0, 0, 0, 0.03) 40%,
    rgba(0, 0, 0, 0.12) 100%
  );
`;

const CardBody = styled.div`
  padding: 22px;
`;

const CardTitle = styled.h3`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.2rem;
  line-height: 1.2;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
`;

const MetaBadge = styled.div`
  min-height: 34px;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.12);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.84rem;
  font-weight: 700;
  border: 1px solid rgba(11, 91, 51, 0.16);
`;

const TrustRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

const TrustBadge = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const CardText = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
`;

const CTAAnchor = styled.a`
  display: inline-flex;
  text-decoration: none;
`;

function VehicleImage({
  image,
  alt,
}: {
  image?: string;
  alt: string;
}) {
  if (!image) return null;

  return (
    <>
      <ImageLayer>
        <SmartImage
          src={image}
          alt={alt}
          sizes="(max-width: 640px) 82vw, (max-width: 768px) 62vw, (max-width: 1200px) 44vw, 34vw"
        />
      </ImageLayer>
      <ImageOverlay />
    </>
  );
}

const VEHICLE_COPY = (tt: TFunction): Record<string, string> => ({
  "BMW 5-Series": tt("PrivateTourVehicles.an-executive-sedan-that-balances"),
  "BMW X5": tt("PrivateTourVehicles.a-luxury-suv-with-elevated"),
  "Hyundai Staria": tt("PrivateTourVehicles.a-premium-people-carrier-with"),
  "Mercedes Sprinter": tt("PrivateTourVehicles.cape-town-s-finest-group"),
  "Mercedes V-Class": tt("PrivateTourVehicles.the-benchmark-for-group-luxury"),
  "Range Rover Sport": tt("PrivateTourVehicles.bold-refined-and-unmistakable-on"),
});

export default function PrivateTourVehicles({ items, tourTitle, title }: Props) {
  const tt = useT();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const { rates, format } = useCurrency();

  const scrollByAmount = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const amount = sliderRef.current.clientWidth * 0.85;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!items.length) return;

    autoScrollRef.current = setInterval(() => {
      const slider = sliderRef.current;
      if (!slider) return;

      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      const nextPosition = slider.scrollLeft + slider.clientWidth * 0.85;

      if (nextPosition >= maxScrollLeft - 10) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: slider.clientWidth * 0.85, behavior: "smooth" });
      }
    }, 4500);

    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [items.length]);

  if (!items.length) return null;

  return (
    <>
      <SectionHeader>
        <SectionEyebrow>{tt("PrivateTourVehicles.private-chauffeur-experience")}</SectionEyebrow>
        <SectionTitle>{title || tt("PrivateTourVehicles.travel-in-comfort-travel-in")}</SectionTitle>
        <SectionText>
          {tt("PrivateTourVehicles.every-vehicle-is-private-climate")}</SectionText>
      </SectionHeader>

      <ValueStrip>
        <ValueItem>{tt("PrivateTourVehicles.private-chauffeur-service")}</ValueItem>
        <ValueItem>{tt("PrivateTourVehicles.fuel-included")}</ValueItem>
        <ValueItem>{tt("PrivateTourVehicles.toll-fees-included")}</ValueItem>
        <ValueItem>{tt("PrivateTourVehicles.hotel-pickup")}</ValueItem>
        <ValueItem>{tt("PrivateTourVehicles.flexible-itinerary")}</ValueItem>
      </ValueStrip>

      <CarouselWrap>
        <Controls>
          <ArrowButton
            type="button"
            aria-label={tt("PrivateTourVehicles.scroll-vehicles-left")}
            onClick={() => scrollByAmount("left")}
          >
            ←
          </ArrowButton>
          <ArrowButton
            type="button"
            aria-label={tt("PrivateTourVehicles.scroll-vehicles-right")}
            onClick={() => scrollByAmount("right")}
          >
            →
          </ArrowButton>
        </Controls>

        <Slider ref={sliderRef}>
          {items.map((item, index) => {
            const vehicleLink = buildWhatsAppLink(
              buildVehicleForTourWhatsAppMessage(item.title, tourTitle)
            );

            return (
              <Card key={`${item.title}-${index}`}>
                <CardImage>
                  <VehicleImage
                    image={item.image}
                    alt={tt("PrivateTourVehicles.available-for", { title: item.title, tourTitle })}
                  />
                </CardImage>

                <CardBody>
                  <CardTitle>{item.title}</CardTitle>

                  <MetaRow>
                    {item.seats ? (
                      <MetaBadge>{tt("PrivateTourVehicles.up-to")}{" "}{item.seats} {tt("PrivateTourVehicles.guests")}</MetaBadge>
                    ) : null}
                    {item.priceRaw ? (
                      <MetaBadge>{tt("PrivateTourVehicles.from")}{" "}{format(item.priceRaw)} {tt("PrivateTourVehicles.per-vehicle")}</MetaBadge>
                    ) : null}
                    <MetaBadge>{tt("PrivateTourVehicles.fuel-included-2")}</MetaBadge>
                    <MetaBadge>{tt("PrivateTourVehicles.toll-fees-included-2")}</MetaBadge>
                    <MetaBadge>{tt("PrivateTourVehicles.local-guide")}</MetaBadge>
                  </MetaRow>

                  <TrustRow>
                    <TrustBadge>{tt("PrivateTourVehicles.5-star-experience")}</TrustBadge>
                    <TrustBadge>{tt("PrivateTourVehicles.popular-choice")}</TrustBadge>
                  </TrustRow>

                  <CardText>
                    {VEHICLE_COPY(tt)[item.title] || item.description || tt("PrivateTourVehicles.a-comfortable-chauffeur-driven-vehicle")}
                  </CardText>

                  <CTAAnchor
                    href={vehicleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackWhatsAppClick({
                        source: "private_tour_vehicles",
                        label: "Check Availability",
                        vehicle: item.title,
                        tour: tourTitle,
                      })
                    }
                  >
                    <Button as="span" $variant="secondary">
                      {tt("PrivateTourVehicles.get-a-price-for-my")}</Button>
                  </CTAAnchor>
                </CardBody>
              </Card>
            );
          })}
        </Slider>
      </CarouselWrap>
    </>
  );
}