"use client";

import styled from "styled-components";
import Container from "../common/Container";

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
    font-size: 2.6rem;
  }
`;

const List = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
  padding: 22px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const Number = styled.div`
  flex: 0 0 40px;
  height: 40px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.1);
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 800;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Body = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  line-height: 1.75;
  font-size: 1rem;

  strong {
    display: block;
    margin-bottom: 4px;
    color: ${({ theme }) => theme.colors.heading};
    font-weight: 700;
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const points = [
  {
    heading: "One client per vehicle per day",
    body: "No shared runs, no split bookings, no second pickup squeezed in around yours.",
  },
  {
    heading: "A small team of vetted guides",
    body: "Every driver is personally selected and PDP licensed. We do not dispatch from a pool.",
  },
  {
    heading: "Priced per vehicle, not per person",
    body: "The same rate whether there are two of you or seven.",
  },
  {
    heading: "December and January are committed months ahead",
    body: "Most clients travelling then arrange between August and October.",
  },
];

export default function HowWeWork() {
  return (
    <Wrapper>
      <Container>
        <Intro>
          <Eyebrow>How We Work</Eyebrow>
          <Title>A small fleet, run properly</Title>
        </Intro>

        <List>
          {points.map((p, i) => (
            <Row key={p.heading}>
              <Number>{i + 1}</Number>
              <Body>
                <strong>{p.heading}</strong>
                <span>{p.body}</span>
              </Body>
            </Row>
          ))}
        </List>
      </Container>
    </Wrapper>
  );
}
