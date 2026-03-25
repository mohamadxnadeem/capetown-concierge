"use client";

import styled from "styled-components";
import Button from "../../common/Button";
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

const Image = styled.div<{ $src: string }>`
  min-height: 240px;
  background:
    linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent),
    url(${({ $src }) => $src}) center/cover no-repeat;
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

export default function ItineraryTimeline({ items }: Props) {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>7 Day Cape Town Itinerary Breakdown</SectionTitle>
          <SectionText>
            This itinerary balances iconic sightseeing, scenic drives, wine
            experiences, beach time, and premium add-ons so you can experience
            Cape Town in comfort without feeling rushed.
          </SectionText>
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
                  <Image $src={item.image} />

                  <Content>
                    <DayBadge>{item.day}</DayBadge>
                    <Title>{item.title}</Title>
                    <Text>{item.description}</Text>

                    <Highlights>
                      {item.highlights.map((highlight) => (
                        <Highlight key={highlight}>{highlight}</Highlight>
                      ))}
                    </Highlights>

                    <Recommendation>
                      <strong>Best booked as:</strong> {item.bestBookedAs}
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
                        <Button as="span">Plan This Day</Button>
                      </Anchor>

                      <StyledLink href="/private-tours">
                        <Button as="span" $variant="secondary">
                          View Private Tours
                        </Button>
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