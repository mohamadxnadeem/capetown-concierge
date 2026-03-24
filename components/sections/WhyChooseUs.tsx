"use client";

import styled from "styled-components";
import Container from "../common/Container";

type TrustItem = {
  title: string;
  description: string;
};

type WhyChooseUsProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: TrustItem[];
};

const Wrapper = styled.section`
  padding: 72px 0;
  background: ${({ theme }) => theme.colors.backgroundSoft};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 96px 0;
  }
`;

const Intro = styled.div`
  max-width: 760px;
  margin: 0 0 40px;
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
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const Card = styled.div`
  min-height: 220px;
  padding: 24px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
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
  margin-bottom: 22px;
`;

const IconMark = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
`;

const CardTitle = styled.h3`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.15rem;
  line-height: 1.25;
`;

const CardText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.98rem;
  line-height: 1.75;
`;

export default function WhyChooseUs({
  eyebrow = "Why Choose Us",
  title = "Premium Travel Experiences Built Around Comfort, Trust, and Detail",
  description = "We combine professional service, luxury presentation, and local insight to create seamless private travel experiences in Cape Town.",
  items,
}: WhyChooseUsProps) {
  return (
    <Wrapper>
      <Container>
        <Intro>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Intro>

        <Grid>
          {items.map((item) => (
            <Card key={item.title}>
              <IconWrap>
                <IconMark />
              </IconWrap>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.description}</CardText>
            </Card>
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
}