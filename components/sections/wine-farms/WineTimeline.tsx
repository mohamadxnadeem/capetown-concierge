"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import {
  Anchor,
  Container,
  Section,
  whatsappLink,
  SectionHeader,
  SectionTitle,
  SectionText,
} from "./shared";
import { trackWhatsAppClick } from "../../../lib/tracking";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const Row = styled.div`
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

const Title = styled.h3`
  margin: 0 0 10px;
  font-size: 1.35rem;
  color: ${({ theme }) => theme.colors.heading};
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
`;

const Badge = styled.div`
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.1);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  font-weight: 700;
`;

const Text = styled.p`
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

const Recommendation = styled.div`
  padding: 14px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.backgroundSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 16px;
  font-size: 0.9rem;
`;

export default function WineTimeline({ items }: any) {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>Best Wine Estates to Visit</SectionTitle>
          <SectionText>
            These are some of the top wine farms in Stellenbosch and Franschhoek,
            offering a mix of luxury experiences, scenic views, and unforgettable
            wine tastings.
          </SectionText>
        </SectionHeader>

        <List>
          {items.map((item: any, index: number) => (
            <Row key={item.title}>
              <ProgressColumn>
                <Rail />
                <Dot />
              </ProgressColumn>

              <Card>
                <Inner>
                  <Image $src={item.image} />

                  <Content>
                    <Title>{item.title}</Title>

                    <BadgeRow>
                      <Badge>{item.bestFor}</Badge>
                    </BadgeRow>

                    <Text>{item.description}</Text>

                    <Recommendation>
                      <strong>Best booked as:</strong> {item.ideal}
                    </Recommendation>

                    <Anchor
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackWhatsAppClick({
                          source: "wine_list",
                          label: item.title,
                        })
                      }
                    >
                      <Button as="span">Plan This Wine Stop</Button>
                    </Anchor>
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