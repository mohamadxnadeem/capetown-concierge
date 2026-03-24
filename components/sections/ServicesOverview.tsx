"use client";

import Link from "next/link";
import styled from "styled-components";
import Container from "../common/Container";

type ServiceItem = {
  title: string;
  description: string;
  href: string;
};

type ServicesOverviewProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  services: ServiceItem[];
};

const Wrapper = styled.section`
  padding: 72px 0;
  background: ${({ theme }) => theme.colors.background};
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 96px 0;
  }
`;

const Header = styled.div`
  max-width: 760px;
  margin: 0 0 36px;
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
    font-size: 2.8rem;
  }
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
  line-height: 1.8;
`;

const Grid = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 250px;
  padding: 24px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.card};
    border-color: rgba(11, 91, 51, 0.22);
  }
`;

const IconWrap = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    rgba(11, 91, 51, 0.12) 0%,
    rgba(6, 62, 35, 0.08) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const IconDot = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
`;

const CardTitle = styled.h3`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.22rem;
  line-height: 1.2;
`;

const CardText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.98rem;
  line-height: 1.75;
`;

const CardFooter = styled.div`
  margin-top: 28px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 0.95rem;
`;

const Arrow = styled.span`
  display: inline-block;
  transform: translateX(0);
  transition: transform 0.2s ease;

  ${Card}:hover & {
    transform: translateX(4px);
  }
`;

export default function ServicesOverview({
  eyebrow = "Our Services",
  title = "Premium Services Designed Around Comfort, Style, and Reliability",
  description = "Explore our private chauffeur services, airport transfers, curated tours, and premium travel experiences in Cape Town.",
  services,
}: ServicesOverviewProps) {
  return (
    <Wrapper>
      <Container>
        <Header>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Header>

        <Grid>
          {services.map((service) => (
            <Card key={service.title} href={service.href}>
              <div>
                <IconWrap>
                  <IconDot />
                </IconWrap>
                <CardTitle>{service.title}</CardTitle>
                <CardText>{service.description}</CardText>
              </div>

              <CardFooter>
                Explore Service <Arrow>→</Arrow>
              </CardFooter>
            </Card>
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
}