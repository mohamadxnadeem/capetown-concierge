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

import { useT } from "../../../lib/i18n/LocaleContext";
import type { TFunction } from "../../../lib/i18n/messages";
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

function getWineFarmAltText(title: string, tt: TFunction) {
  const key = title.toLowerCase();

  if (key.includes("delaire") || key.includes("graff")) {
    return tt("WineTimeline.delaire-graff-estate-luxury-wine");
  }
  if (key.includes("babylonstoren")) {
    return tt("WineTimeline.babylonstoren-wine-farm-and-gardens");
  }
  if (key.includes("boschendal")) {
    return tt("WineTimeline.boschendal-wine-estate-and-picnic");
  }
  if (key.includes("tokara")) {
    return tt("WineTimeline.tokara-wine-estate-vineyard-views");
  }
  if (key.includes("groot constantia")) {
    return tt("WineTimeline.groot-constantia-historic-wine-estate");
  }
  if (key.includes("waterford")) {
    return tt("WineTimeline.waterford-estate-wine-tasting-experience");
  }
  if (key.includes("vredenheim") || key.includes("wild cat")) {
    return tt("WineTimeline.vredenheim-wine-estate-and-wild");
  }
  if (key.includes("spier")) {
    return tt("WineTimeline.spier-wine-farm-in-the");
  }
  if (key.includes("postcard")) {
    return tt("WineTimeline.postcard-cafe-vineyard-views-and");
  }
  if (key.includes("lanzerac")) {
    return tt("WineTimeline.lanzerac-wine-estate-luxury-wine");
  }

  return tt("WineTimeline.wine-farm-in-the-cape", { title });
}

export default function WineTimeline({ items }: Props) {
  const tt = useT();
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>{tt("WineTimeline.top-10-wine-farms-in")}</SectionTitle>
          <SectionText>
            {tt("WineTimeline.explore-some-of-the-best")}</SectionText>
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
                      alt={getWineFarmAltText(item.title, tt)}
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
                        {item.tags.map((tag: string) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </TagGrid>
                    ) : null}

                    <Text>{item.description}</Text>

                    <Recommendation>
                      <strong>{tt("WineTimeline.best-booked-as")}</strong> {item.ideal}
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
                      <Button as="span">{tt("WineTimeline.plan-this-wine-stop")}</Button>
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