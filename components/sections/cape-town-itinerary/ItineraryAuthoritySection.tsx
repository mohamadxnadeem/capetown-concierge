"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

import { useT } from "../../../lib/i18n/LocaleContext";
const Section = styled.section`
  padding: 72px 0;
  background: ${({ theme }) => theme.colors.white};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 96px 0;
  }
`;

const Container = styled.div`
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: min(1120px, calc(100% - 64px));
  }
`;

const Header = styled.div`
  max-width: 760px;
  margin-bottom: 28px;
`;

const Eyebrow = styled.div`
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.08;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const Intro = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.9;
  font-size: 1rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 18px;
  margin-bottom: 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Card = styled.div`
  padding: 22px;
  border-radius: 22px;
  background: ${({ theme }) => theme.colors.backgroundSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const CardTitle = styled.h3`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.05rem;
  line-height: 1.2;
`;

const CardText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
  font-size: 0.95rem;
`;

const ExpandWrap = styled.div`
  border-radius: 22px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
`;

const ExpandButton = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  padding: 20px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: rgba(11, 91, 51, 0.03);
  }
`;

const ExpandTitle = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  line-height: 1.4;
`;

const ExpandIcon = styled.div<{ $open: boolean }>`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.08);
  color: ${({ theme }) => theme.colors.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  transform: ${({ $open }) => ($open ? "rotate(45deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease;
`;

const ExpandBody = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  transition: grid-template-rows 0.25s ease;
`;

const ExpandInner = styled.div`
  overflow: hidden;
`;

const RichText = styled.div`
  padding: 0 22px 22px;

  p {
    margin: 0 0 16px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.9;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

const InlineLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function ItineraryAuthoritySection() {
  const tt = useT();
  const [open, setOpen] = useState(false);

  return (
    <Section>
      <Container>
        <Header>
          <Eyebrow>{tt("ItineraryAuthoritySection.luxury-cape-town-travel-guide")}</Eyebrow>
          <Title>{tt("ItineraryAuthoritySection.how-to-plan-the-perfect")}</Title>
          <Intro>
            {tt("ItineraryAuthoritySection.a-well-planned-cape-town")}</Intro>
        </Header>

        <Grid>
          <Card>
            <CardTitle>{tt("ItineraryAuthoritySection.see-the-essentials")}</CardTitle>
            <CardText>
              {tt("ItineraryAuthoritySection.a-strong-7-day-itinerary")}</CardText>
          </Card>

          <Card>
            <CardTitle>{tt("ItineraryAuthoritySection.travel-in-comfort")}</CardTitle>
            <CardText>
              {tt("ItineraryAuthoritySection.using-a-private-chauffeur-makes")}</CardText>
          </Card>

          <Card>
            <CardTitle>{tt("ItineraryAuthoritySection.leave-space-for-luxury")}</CardTitle>
            <CardText>
              {tt("ItineraryAuthoritySection.the-best-itineraries-also-include")}</CardText>
          </Card>
        </Grid>

        <ExpandWrap>
          <ExpandButton type="button" onClick={() => setOpen((v) => !v)}>
            <ExpandTitle>{tt("ItineraryAuthoritySection.why-this-7-day-cape")}</ExpandTitle>
            <ExpandIcon $open={open}>+</ExpandIcon>
          </ExpandButton>

          <ExpandBody $open={open}>
            <ExpandInner>
              <RichText>
                <p>
                  {tt("ItineraryAuthoritySection.planning-a-7-day-cape")}{" "}
                  <InlineLink href={tt.path("/tours/cape-peninsula-tour")}>
                    {tt("ItineraryAuthoritySection.private-cape-peninsula-tour")}</InlineLink>
                  , a{" "}
                  <InlineLink href={tt.path("/best-wine-farms-in-cape-town")}>
                    {tt("ItineraryAuthoritySection.cape-winelands-experience")}</InlineLink>
                  {" "}{tt("ItineraryAuthoritySection.or-a")}{" "}
                  <InlineLink href={tt.path("/tours/winelands-chauffeur-drive")}>
                    {tt("ItineraryAuthoritySection.private-winelands-tour")}</InlineLink>
                  {tt("ItineraryAuthoritySection.leisure-time-around-the-atlantic")}</p>

                <p>
                  {tt("ItineraryAuthoritySection.one-of-the-best-ways")}{" "}
                  <InlineLink href={tt.path("/chauffeur-hire")}>
                    {tt("ItineraryAuthoritySection.private-chauffeur-in-cape-town")}</InlineLink>{" "}
                  {tt("ItineraryAuthoritySection.or-curated-day-planning-service")}</p>

                <p>
                  {tt("ItineraryAuthoritySection.the-best-cape-town-itinerary")}</p>
              </RichText>
            </ExpandInner>
          </ExpandBody>
        </ExpandWrap>
      </Container>
    </Section>
  );
}