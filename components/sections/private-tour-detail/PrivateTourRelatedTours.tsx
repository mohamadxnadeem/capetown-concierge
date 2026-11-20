"use client";

import styled from "styled-components";
import Link from "next/link";
import Button from "../../common/Button";
import SmartImage from "../../common/SmartImage";
import { RelatedTour } from "./types";
import { getTourSeo, slugFromHref } from "../../../lib/tourSeo";

import { useLocale, useT } from "../../../lib/i18n/LocaleContext";
import type { TFunction } from "../../../lib/i18n/messages";
/* ===== styles unchanged ===== */

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

const OfferCard = styled.div`
  margin-bottom: 26px;
  background: linear-gradient(
    135deg,
    rgba(11, 91, 51, 0.08) 0%,
    rgba(6, 62, 35, 0.04) 100%
  );
  border: 1px solid rgba(11, 91, 51, 0.12);
  border-radius: 20px;
  padding: 28px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const OfferTitle = styled.h3`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.45rem;
`;

const OfferText = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
  max-width: 760px;
`;

const OfferCta = styled.a`
  display: inline-flex;
  text-decoration: none;
`;

const Grid = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Card = styled.div`
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
`;

const CardText = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
`;

type Props = {
  items: RelatedTour[];
  bundleWhatsappLink: string;
};

const TOUR_COPY = (tt: TFunction): Record<string, string> => ({
  "Cape Peninsula Private Tour": tt("PrivateTourRelatedTours.two-oceans-wild-penguins-and"),
  "City and Table Mountain Tour": tt("PrivateTourRelatedTours.cape-town-s-most-iconic"),
  "Romantic Stellenbosch Winelands Experience": tt("PrivateTourRelatedTours.a-private-drive-through-south"),
  "Sunset Safari Day Trip": tt("PrivateTourRelatedTours.the-big-5-golden-hour"),
});

export default function PrivateTourRelatedTours({
  items,
  bundleWhatsappLink,
}: Props) {
  const tt = useT();
  const locale = useLocale();
  if (!items.length) return null;

  return (
    <>
      <SectionHeader>
        <SectionEyebrow>{tt("PrivateTourRelatedTours.more-experiences")}</SectionEyebrow>
        <SectionTitle>{tt("PrivateTourRelatedTours.more-of-cape-town-done")}</SectionTitle>
        <SectionText>
          {tt("PrivateTourRelatedTours.every-tour-is-fully-private")}</SectionText>
      </SectionHeader>

      <OfferCard>
        <OfferTitle>{tt("PrivateTourRelatedTours.bundle-save")}</OfferTitle>
        <OfferText>
          {tt("PrivateTourRelatedTours.book-any-3-private-tours")}</OfferText>

        <OfferCta href={bundleWhatsappLink} target="_blank">
          <Button as="span">{tt("PrivateTourRelatedTours.get-3-tour-offer-on")}</Button>
        </OfferCta>
      </OfferCard>

      <Grid>
        {items.map((item, index) => {
          const seo = getTourSeo(slugFromHref(item.href), locale);
          const name = seo?.cardName || item.title;
          return (
          <Card key={`${item.title}-${index}`}>
            <CardImage>
              {item.image ? (
                <SmartImage
                  src={item.image}
                  alt={seo?.imageAlt || tt("PrivateTourRelatedTours.private-tour-from-cape-town", { title: item.title })}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : null}
            </CardImage>

            <CardBody>
              <CardTitle>{name}</CardTitle>

              <CardText>
                {TOUR_COPY(tt)[item.title] || item.description || tt("PrivateTourRelatedTours.discover-another-premium-private-tour")}
              </CardText>

              <Link href={tt.path(item.href)} aria-label={tt("PrivateTourRelatedTours.read-more-about-the", { name })}>
                <Button as="span" $variant="secondary">
                  {tt("PrivateTourRelatedTours.see-the")}{" "}{name}
                </Button>
              </Link>
            </CardBody>
          </Card>
          );
        })}
      </Grid>
    </>
  );
}