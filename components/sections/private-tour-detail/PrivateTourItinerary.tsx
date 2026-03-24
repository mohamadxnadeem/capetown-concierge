"use client";

import styled from "styled-components";
import Image from "next/image";
import { ExperienceStop } from "./types";

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

const TimelineWrap = styled.div`
  position: relative;
  display: grid;
  gap: 22px;
`;

const TimelineItem = styled.div`
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr);
  gap: 18px;
  align-items: start;
`;

const TimelineRail = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  min-height: 100%;
  padding-bottom: 22px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      180deg,
      rgba(11, 91, 51, 0.18) 0%,
      rgba(11, 91, 51, 0.08) 100%
    );
  }
`;

const TimelineLine = styled.div`
  position: absolute;
  top: 42px;
  bottom: -22px;
  width: 2px;
  background: linear-gradient(
    180deg,
    rgba(11, 91, 51, 0.32) 0%,
    rgba(11, 91, 51, 0.12) 100%
  );
  z-index: 1;
`;

const TimelineDot = styled.div`
  position: relative;
  z-index: 2;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  box-shadow: 0 10px 25px rgba(11, 91, 51, 0.18);
`;

const StopCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 22px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const StopTop = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 220px minmax(0, 1fr);
    align-items: start;
  }
`;

const StopImage = styled.div`
  position: relative;
  min-height: 180px;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(11, 91, 51, 0.12), rgba(6, 62, 35, 0.06));
`;

const StopEyebrow = styled.div`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const StopTitle = styled.h3`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.35rem;
  line-height: 1.2;
`;

const StopText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

const StopMetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
`;

const StopMeta = styled.div`
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.heading};
  font-size: 0.85rem;
  font-weight: 600;
`;

type Props = {
  title: string;
  location?: string;
  stops: ExperienceStop[];
};

export default function PrivateTourItinerary({ title, location, stops }: Props) {
  if (!stops.length) return null;

  return (
    <>
      <SectionHeader>
        <SectionEyebrow>Itinerary</SectionEyebrow>
        <SectionTitle>How the Day Flows</SectionTitle>
        <SectionText>
          Explore how your private tour unfolds from the first stop to the final scenic moments of the day.
        </SectionText>
      </SectionHeader>

      <TimelineWrap>
        {stops.map((stop, index) => {
          const isLast = index === stops.length - 1;

          return (
            <TimelineItem key={stop.id}>
              <TimelineRail>
                {!isLast && <TimelineLine />}
                <TimelineDot>{index + 1}</TimelineDot>
              </TimelineRail>

              <StopCard>
                <StopTop>
                  <StopImage>
                    {stop.image ? (
                      <Image
                        src={stop.image}
                        alt={`${stop.title} on the ${title}`}
                        fill
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(600, 400))}`}
                        sizes="(max-width: 768px) 100vw, 220px"
                        style={{ objectFit: "cover" }}
                      />
                    ) : null}
                  </StopImage>

                  <div>
                    <StopEyebrow>
                      {stop.stop_type ? `${stop.stop_type} stop` : "Tour stop"}
                    </StopEyebrow>
                    <StopTitle>
                      Stop {index + 1}: {stop.title}
                      {location ? ` in ${location}` : ""}
                    </StopTitle>
                    <StopText>
                      {stop.short_description ||
                        stop.highlight ||
                        "A memorable stop along your private Cape Town tour."}
                    </StopText>

                    <StopMetaRow>
                      {stop.estimated_time ? (
                        <StopMeta>{stop.estimated_time}</StopMeta>
                      ) : null}
                      {stop.highlight ? <StopMeta>{stop.highlight}</StopMeta> : null}
                    </StopMetaRow>
                  </div>
                </StopTop>
              </StopCard>
            </TimelineItem>
          );
        })}
      </TimelineWrap>
    </>
  );
}