"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import SmartImage from "../../common/SmartImage";
import { trackWhatsAppClick } from "../../../lib/tracking";
import {
  Anchor,
  Container,
  Section,
  SectionHeader,
  SectionText,
  SectionTitle,
  StyledLink,
  whatsappLink,
} from "./shared";
import { ItineraryDay } from "./types";

import { useT } from "../../../lib/i18n/LocaleContext";
import type { TFunction } from "../../../lib/i18n/messages";
const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const Row = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 56px minmax(0, 1fr);
    gap: 18px;
  }
`;

const ProgressColumn = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    justify-content: center;
    position: relative;
  }
`;

const Rail = styled.div`
  position: absolute;
  top: 0;
  bottom: -22px;
  width: 2px;
  background: linear-gradient(
    180deg,
    rgba(11, 91, 51, 0.24),
    rgba(11, 91, 51, 0.08)
  );
`;

const Dot = styled.div`
  margin-top: 26px;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0 0 6px rgba(11, 91, 51, 0.12);
  z-index: 2;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const Inner = styled.div`
  display: grid;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 360px 1fr;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  min-height: 240px;
  background: linear-gradient(
    135deg,
    rgba(11, 91, 51, 0.12),
    rgba(6, 62, 35, 0.06)
  );
`;

const Content = styled.div`
  padding: 24px;
`;

const DayBadge = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.08);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.76rem;
  font-weight: 700;
  margin-bottom: 12px;
`;

const Title = styled.h3`
  margin: 0 0 10px;
  font-size: 1.35rem;
  color: ${({ theme }) => theme.colors.heading};
`;

const Text = styled.p`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

const Highlights = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
`;

const Highlight = styled.div`
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.1);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  font-weight: 700;
`;

const Recommendation = styled.div`
  padding: 14px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.backgroundSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 16px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

type Props = {
  items: ItineraryDay[];
};

function getItineraryAltText(day: string | number, title: string, tt: TFunction) {
  const key = tt("ItineraryTimeline.text", { day, title }).toLowerCase();

  if (
    key.includes("arrival") ||
    key.includes("atlantic seaboard") ||
    key.includes("camps bay")
  ) {
    return tt("ItineraryTimeline.cape-town-arrival-day-with");
  }
  if (
    key.includes("cape peninsula") ||
    key.includes("cape point") ||
    key.includes("good hope")
  ) {
    return tt("ItineraryTimeline.cape-peninsula-private-tour-with");
  }
  if (
    key.includes("wine") ||
    key.includes("stellenbosch") ||
    key.includes("franschhoek")
  ) {
    return tt("ItineraryTimeline.cape-winelands-wine-tasting-day");
  }
  if (
    key.includes("table mountain") ||
    key.includes("bo-kaap") ||
    key.includes("city")
  ) {
    return tt("ItineraryTimeline.table-mountain-and-cape-town");
  }
  if (
    key.includes("beach") ||
    key.includes("coastal") ||
    key.includes("leisure")
  ) {
    return tt("ItineraryTimeline.beach-and-coastal-lifestyle-day");
  }
  if (
    key.includes("helicopter") ||
    key.includes("yacht") ||
    key.includes("safari") ||
    key.includes("luxury")
  ) {
    return tt("ItineraryTimeline.luxury-add-on-experience-on");
  }
  if (
    key.includes("departure") ||
    key.includes("airport transfer") ||
    key.includes("final morning")
  ) {
    return tt("ItineraryTimeline.cape-town-departure-day-with");
  }

  return tt("ItineraryTimeline.on-a-7-day-cape", { title });
}

export default function ItineraryTimeline({ items }: Props) {
  const tt = useT();
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>{tt("ItineraryTimeline.7-day-cape-town-itinerary")}</SectionTitle>
          <SectionText>
            {tt("ItineraryTimeline.this-itinerary-balances-iconic-sightseeing")}</SectionText>
        </SectionHeader>

        <List>
          {items.map((item) => (
            <Row key={item.day}>
              <ProgressColumn>
                <Rail />
                <Dot />
              </ProgressColumn>

              <Card>
                <Inner>
                  <ImageWrap>
                    <SmartImage
                      src={item.image}
                      alt={getItineraryAltText(item.day, item.title, tt)}
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                  </ImageWrap>

                  <Content>
                    <DayBadge>{item.day}</DayBadge>
                    <Title>{item.title}</Title>
                    <Text>{item.description}</Text>

                    <Highlights>
                      {item.highlights.map((highlight: string) => (
                        <Highlight key={highlight}>{highlight}</Highlight>
                      ))}
                    </Highlights>

                    <Recommendation>
                      <strong>{tt("ItineraryTimeline.best-booked-as")}</strong> {item.bestBookedAs}
                    </Recommendation>

                    <Actions>
                      <Anchor
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackWhatsAppClick({
                            source: "itinerary_timeline",
                            label: `Plan ${item.day}`,
                            tour: item.title,
                          })
                        }
                      >
                        <Button as="span">{tt("ItineraryTimeline.plan-this-day")}</Button>
                      </Anchor>

                      <StyledLink href={tt.path("/tours")}>
                        <Button as="span" $variant="secondary">
                          {tt("ItineraryTimeline.view-private-tours")}</Button>
                      </StyledLink>
                    </Actions>
                  </Content>
                </Inner>
              </Card>
            </Row>
          ))}
        </List>
      </Container>
    </Section>
  );
}