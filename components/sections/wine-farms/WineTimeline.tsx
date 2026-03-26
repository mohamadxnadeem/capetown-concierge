"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import SmartImage from "../../common/SmartImage";
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

type WineFarmItem = {
  title: string;
  image: string;
  description: string;
  bestFor: string;
  ideal: string;
  tags?: string[];
};

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
  margin: 0 0 16px;
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
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

const TagGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
`;

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.06);
  border: 1px solid rgba(11, 91, 51, 0.12);
  color: ${({ theme }) => theme.colors.heading};
  font-size: 0.76rem;
  font-weight: 700;
`;

type Props = {
  items: WineFarmItem[];
};

function getWineFarmAltText(title: string) {
  const key = title.toLowerCase();

  if (key.includes("delaire") || key.includes("graff")) {
    return "Delaire Graff Estate vineyard and luxury wine experience in Stellenbosch near Cape Town";
  }
  if (key.includes("babylonstoren")) {
    return "Babylonstoren wine farm and gardens in the Cape Winelands near Cape Town";
  }
  if (key.includes("boschendal")) {
    return "Boschendal wine estate and picnic setting in the Cape Winelands near Cape Town";
  }
  if (key.includes("tokara")) {
    return "Tokara Wine Estate vineyard views in Stellenbosch near Cape Town";
  }
  if (key.includes("groot constantia")) {
    return "Groot Constantia historic wine estate near Cape Town";
  }
  if (key.includes("waterford")) {
    return "Waterford Estate wine tasting experience in Stellenbosch near Cape Town";
  }
  if (key.includes("vredenheim") || key.includes("wild cat")) {
    return "Vredenheim wine estate and wild cat experience near Cape Town";
  }
  if (key.includes("spier")) {
    return "Spier Wine Farm in the Cape Winelands near Cape Town";
  }
  if (key.includes("postcard")) {
    return "Postcard Cafe vineyard views and wine stop in Stellenbosch near Cape Town";
  }
  if (key.includes("lanzerac")) {
    return "Lanzerac Wine Estate luxury wine tasting in Stellenbosch near Cape Town";
  }

  return `${title} wine farm in the Cape Winelands near Cape Town`;
}

export default function WineTimeline({ items }: Props) {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>Top 10 Wine Farms in Cape Town</SectionTitle>
          <SectionText>
            Explore some of the best wine farms near Cape Town, whether you are
            looking for the most romantic estates, family-friendly options,
            scenic lunch spots, or premium luxury tastings in Stellenbosch,
            Franschhoek, and Constantia.
          </SectionText>
        </SectionHeader>

        <List>
          {items.map((item, index) => (
            <Row key={item.title}>
              <ProgressColumn>
                <Rail />
                <Dot />
              </ProgressColumn>

              <Card>
                <Inner>
                  <ImageWrap>
                    <SmartImage
                      src={item.image}
                      alt={getWineFarmAltText(item.title)}
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                  </ImageWrap>

                  <Content>
                    <Title>
                      {index + 1}. {item.title}
                    </Title>

                    <BadgeRow>
                      <Badge>{item.bestFor}</Badge>
                    </BadgeRow>

                    {item.tags?.length ? (
                      <TagGrid>
                        {item.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </TagGrid>
                    ) : null}

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
                          tour: item.title,
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