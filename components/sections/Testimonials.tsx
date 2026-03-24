"use client";

import styled from "styled-components";
import Container from "../common/Container";

type TestimonialItem = {
  name: string;
  subtitle?: string;
  quote: string;
};

type TestimonialsProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: TestimonialItem[];
};

const Wrapper = styled.section`
  padding: 72px 0;
  background: ${({ theme }) => theme.colors.background};

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
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  min-height: 280px;
  padding: 28px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const QuoteMark = styled.div`
  margin-bottom: 18px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  line-height: 1;
  font-weight: 700;
`;

const Quote = styled.p`
  margin: 0 0 24px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1rem;
  line-height: 1.85;
  flex: 1;
`;

const Footer = styled.div`
  padding-top: 18px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Name = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  margin-bottom: 4px;
`;

const Subtitle = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
`;

export default function Testimonials({
  eyebrow = "Client Testimonials",
  title = "Trusted by Travelers Who Value Comfort, Detail, and Reliability",
  description = "From airport transfers to private tours, our clients choose us for a polished, seamless, and premium experience in Cape Town.",
  items,
}: TestimonialsProps) {
  return (
    <Wrapper>
      <Container>
        <Intro>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Intro>

        <Grid>
          {items.map((item, index) => (
            <Card key={`${item.name}-${index}`}>
              <QuoteMark>“</QuoteMark>
              <Quote>{item.quote}</Quote>

              <Footer>
                <Name>{item.name}</Name>
                {item.subtitle ? <Subtitle>{item.subtitle}</Subtitle> : null}
              </Footer>
            </Card>
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
}