"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import Button from "../../common/Button";
import { TourVehicle } from "./types";
import {
  buildWhatsAppLink,
  buildVehicleForTourWhatsAppMessage,
} from "../../../lib/whatsapp";

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
  grid-auto-columns: 86%;
  gap: 18px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding-bottom: 8px;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-auto-columns: 60%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-auto-columns: 42%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-auto-columns: 32%;
  }
`;

const Card = styled.div`
  scroll-snap-align: start;
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
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.heading};
  font-size: 0.84rem;
  font-weight: 700;
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

type Props = {
  items: TourVehicle[];
  tourTitle: string;
};

export default function PrivateTourVehicles({ items, tourTitle }: Props) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const amount = sliderRef.current.clientWidth * 0.9;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const startAutoScroll = () => {
    if (!sliderRef.current) return;

    if (autoScrollRef.current) clearInterval(autoScrollRef.current);

    autoScrollRef.current = setInterval(() => {
      const slider = sliderRef.current;
      if (!slider) return;

      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      const nextPosition = slider.scrollLeft + slider.clientWidth * 0.9;

      if (nextPosition >= maxScrollLeft - 10) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: slider.clientWidth * 0.9, behavior: "smooth" });
      }
    }, 4500);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  useEffect(() => {
    if (!items.length) return;
    startAutoScroll();
    return () => stopAutoScroll();
  }, [items.length]);

  if (!items.length) return null;

  return (
    <>
      <SectionHeader>
        <SectionEyebrow>Available Vehicles</SectionEyebrow>
        <SectionTitle>Vehicles Available for This Tour</SectionTitle>
        <SectionText>
          Travel this experience in comfort with a premium chauffeur-driven vehicle suited to your preferences, group size, and style of travel.
        </SectionText>
      </SectionHeader>

      <CarouselWrap
        onMouseEnter={stopAutoScroll}
        onMouseLeave={startAutoScroll}
        onTouchStart={stopAutoScroll}
        onTouchEnd={startAutoScroll}
      >
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
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={`${item.title} available for ${tourTitle}`}
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

                  <MetaRow>
                    {item.seats ? <MetaBadge>{item.seats} Seats</MetaBadge> : null}
                    {item.price ? <MetaBadge>{item.price}</MetaBadge> : null}
                  </MetaRow>

                  <CardText>
                    {item.description ||
                      "A comfortable chauffeur-driven vehicle suitable for premium touring in Cape Town."}
                  </CardText>

                  <CTAAnchor
                    href={vehicleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button as="span" $variant="secondary">
                      Ask About This Vehicle
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