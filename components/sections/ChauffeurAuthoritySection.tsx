"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { brand } from "../../lib/brand";

import { useT } from "../../lib/i18n/LocaleContext";
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

const SectionHeader = styled.div`
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

export default function ChauffeurAuthoritySection() {
  const tt = useT();
  const [open, setOpen] = useState(false);

  return (
    <Section>
      <Container>
        <SectionHeader>
          <Eyebrow>{tt("ChauffeurAuthoritySection.chauffeur-service-cape-town")}</Eyebrow>
          <Title>{tt("ChauffeurAuthoritySection.the-premier-chauffeur-private-tour")}</Title>
          <Intro>
            {tt("ChauffeurAuthoritySection.discover-a-more-polished-way")}</Intro>
        </SectionHeader>

        <Grid>
          <Card>
            <CardTitle>{tt("ChauffeurAuthoritySection.luxury-fleet")}</CardTitle>
            <CardText>
              {tt("ChauffeurAuthoritySection.travel-in-premium-vehicles-including")}</CardText>
          </Card>

          <Card>
            <CardTitle>{tt("ChauffeurAuthoritySection.private-touring")}</CardTitle>
            <CardText>
              {tt("ChauffeurAuthoritySection.enjoy-tailored-experiences-such-as")}</CardText>
          </Card>

          <Card>
            <CardTitle>{tt("ChauffeurAuthoritySection.all-inclusive-experience")}</CardTitle>
            <CardText>
              {tt("ChauffeurAuthoritySection.our-service-is-designed-to")}</CardText>
          </Card>
        </Grid>

        <ExpandWrap>
          <ExpandButton type="button" onClick={() => setOpen((v) => !v)}>
            <ExpandTitle>{tt("ChauffeurAuthoritySection.why-our-chauffeur-service-stands")}</ExpandTitle>
            <ExpandIcon $open={open}>+</ExpandIcon>
          </ExpandButton>

          <ExpandBody $open={open}>
            <ExpandInner>
              <RichText>
                <p>
                  {tt("ChauffeurAuthoritySection.if-you-are-searching-for")}{" "}{brand.name}{tt("ChauffeurAuthoritySection.we-focus-on-delivering-a")}</p>

                <p>
                  {tt("ChauffeurAuthoritySection.our-fleet-is-carefully-positioned")}</p>

                <p>
                  {tt("ChauffeurAuthoritySection.we-also-specialise-in-private")}{" "}
                  <InlineLink href={tt.path("/tours/cape-peninsula-tour")}>
                    {tt("ChauffeurAuthoritySection.cape-peninsula-private-tour")}</InlineLink>
                  {tt("ChauffeurAuthoritySection.scenic-coastal-drives-and-curated")}{" "}
                  <InlineLink href={tt.path("/best-wine-farms-in-cape-town")}>
                    {tt("ChauffeurAuthoritySection.cape-winelands-wine-tours")}</InlineLink>{" "}
                  {tt("ChauffeurAuthoritySection.through-stellenbosch-and-franschhoek-many")}</p>
              </RichText>
            </ExpandInner>
          </ExpandBody>
        </ExpandWrap>
      </Container>
    </Section>
  );
}