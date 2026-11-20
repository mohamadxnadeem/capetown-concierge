"use client";

import styled from "styled-components";
import Link from "next/link";
import {
  Container,
  Section,
  SectionEyebrow,
  SectionHeader,
  SectionText,
  SectionTitle,
  InfoCard,
} from "./shared";

import { useT } from "../../../lib/i18n/LocaleContext";
const Grid = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Card = styled(InfoCard)`
  padding: 24px;
`;

const CardTitle = styled.h3`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.1rem;
  line-height: 1.2;
`;

const CardText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

export default function WineByTravelStyle() {
  const tt = useT();
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionEyebrow>{tt("WineByTravelStyle.choose-the-right-experience")}</SectionEyebrow>
          <SectionTitle>{tt("WineByTravelStyle.best-wine-farms-by-travel")}</SectionTitle>
          <SectionText>
            {tt("WineByTravelStyle.not-every-wine-farm-offers")}{" "}
            <Link href={tt.path("/tours/winelands-chauffeur-drive")} style={{color:"inherit",textDecoration:"underline"}}>
              {tt("WineByTravelStyle.private-winelands-tour")}</Link>{" "}
            {tt("WineByTravelStyle.or-arrange")}{" "}
            <Link href={tt.path("/chauffeur-hire")} style={{color:"inherit",textDecoration:"underline"}}>
              {tt("WineByTravelStyle.chauffeur-hire-in-cape-town")}</Link>{" "}
            {tt("WineByTravelStyle.for-the-day")}</SectionText>
        </SectionHeader>

        <Grid>
          <Card>
            <CardTitle>{tt("WineByTravelStyle.most-romantic-wine-farms")}</CardTitle>
            <CardText>
              {tt("WineByTravelStyle.delaire-graff-waterford-estate-lanzerac")}{" "}
              <Link href={tt.path("/tours/winelands-chauffeur-drive")} style={{color:"inherit",textDecoration:"underline"}}>
                {tt("WineByTravelStyle.stellenbosch-and-franschhoek-private-winelands")}</Link>{" "}
              {tt("WineByTravelStyle.for-a-fully-curated-day")}</CardText>
          </Card>

          <Card>
            <CardTitle>{tt("WineByTravelStyle.best-wine-farms-for-families")}</CardTitle>
            <CardText>
              {tt("WineByTravelStyle.babylonstoren-boschendal-spier-and-vredenheim")}</CardText>
          </Card>

          <Card>
            <CardTitle>{tt("WineByTravelStyle.best-luxury-wine-estates")}</CardTitle>
            <CardText>
              {tt("WineByTravelStyle.delaire-graff-waterford-estate-and")}</CardText>
          </Card>

          <Card>
            <CardTitle>{tt("WineByTravelStyle.best-scenic-lunch-view-stops")}</CardTitle>
            <CardText>
              {tt("WineByTravelStyle.postcard-caf-tokara-babylonstoren-and")}</CardText>
          </Card>

          <Card>
            <CardTitle>{tt("WineByTravelStyle.best-wine-farms-for-first")}</CardTitle>
            <CardText>
              {tt("WineByTravelStyle.delaire-graff-tokara-babylonstoren-boschendal")}</CardText>
          </Card>

          <Card>
            <CardTitle>{tt("WineByTravelStyle.best-for-shorter-wine-days")}</CardTitle>
            <CardText>
              {tt("WineByTravelStyle.groot-constantia-is-a-great")}</CardText>
          </Card>
        </Grid>
      </Container>
    </Section>
  );
}