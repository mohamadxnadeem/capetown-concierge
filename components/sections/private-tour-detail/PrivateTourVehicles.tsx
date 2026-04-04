"use client";

import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import Button from "../../common/Button";
import { TourVehicle } from "./types";
import {
  buildWhatsAppLink,
  buildVehicleForTourWhatsAppMessage,
} from "../../../lib/whatsapp";
import { trackWhatsAppClick } from "../../../lib/tracking";

type Props = {
  items: TourVehicle[];
  tourTitle: string;
};

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

const shimmerSweep = keyframes`
  0% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(120%);
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

const ShimmerMask = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(11, 91, 51, 0.08), rgba(6, 62, 35, 0.04));

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -140%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.55) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: ${shimmerSweep} 1.5s infinite;
  }
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
  color: #0b5b33;
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
  color: #0b5b33;
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
  const [loaded, setLoaded] = useState(false);

  if (!image) return null;

  return (
    <>
      {!loaded && <ShimmerMask />}
      <ImageLayer>
        <Image
          src={image}
          alt={alt}
          fill
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 500)
          )}`}
          sizes="(max-width: 640px) 82vw, (max-width: 768px) 62vw, (max-width: 1200px) 44vw, 34vw"
          style={{ objectFit: "cover" }}
          onLoad={() => setLoaded(true)}
        />
      </ImageLayer>
      <ImageOverlay />
    </>
  );
}

export default function PrivateTourVehicles({ items, tourTitle }: Props) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

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
        <SectionEyebrow>Private Chauffeur Experience</SectionEyebrow>
        <SectionTitle>Travel Cape Town in Complete Comfort & Privacy</SectionTitle>
        <SectionText>
          Enjoy a fully private, chauffeur-driven experience with everything
          taken care of — from hotel pickup to scenic routes, local insight, and
          seamless travel throughout your day.
        </SectionText>
      </SectionHeader>

      <ValueStrip>
        <ValueItem>✔ Private Chauffeur Service</ValueItem>
        <ValueItem>✔ Fuel Included</ValueItem>
        <ValueItem>✔ Toll Fees Included</ValueItem>
        <ValueItem>✔ Hotel Pickup</ValueItem>
        <ValueItem>✔ Flexible Itinerary</ValueItem>
      </ValueStrip>

      <CarouselWrap>
        <Controls>
          <ArrowButton
            type="button"
            aria-label="Scroll vehicles left"
            onClick={() => scrollByAmount("left")}
          >
            ←
          </ArrowButton>
          <ArrowButton
            type="button"
            aria-label="Scroll vehicles right"
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
                    alt={`${item.title} available for ${tourTitle}`}
                  />
                </CardImage>

                <CardBody>
                  <CardTitle>{item.title}</CardTitle>

                  <MetaRow>
                    {item.seats ? (
                      <MetaBadge>Up to {item.seats} guests</MetaBadge>
                    ) : null}
                    <MetaBadge>Fuel Included</MetaBadge>
                    <MetaBadge>Toll Fees Included</MetaBadge>
                    <MetaBadge>Local Guide</MetaBadge>
                  </MetaRow>

                  <TrustRow>
                    <TrustBadge>⭐ 5-Star Experience</TrustBadge>
                    <TrustBadge>🔥 Popular Choice</TrustBadge>
                  </TrustRow>

                  <CardText>
                    {item.description ||
                      "A comfortable chauffeur-driven vehicle suitable for premium touring in Cape Town."}
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
                      Check Availability
                    </Button>
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