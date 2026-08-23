"use client";

import styled from "styled-components";
import { Container } from "../cape-town-itinerary/shared";

const Wrapper = styled.section`
  padding: 8px 0 56px;
  background: ${({ theme }) => theme.colors.background};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 8px 0 72px;
  }
`;

const Callout = styled.div`
  padding: 28px;
  border-radius: 22px;
  background: rgba(196, 149, 51, 0.08);
  border: 2px solid rgba(196, 149, 51, 0.32);
  box-shadow: ${({ theme }) => theme.shadows.soft};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 36px;
  }
`;

const Label = styled.div`
  margin-bottom: 12px;
  color: #8a6516;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const Title = styled.h3`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.3rem;
  line-height: 1.25;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

const Body = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.heading};
  line-height: 1.85;
  font-size: 1rem;
`;

export default function AccommodationNotice() {
  return (
    <Wrapper>
      <Container>
        <Callout>
          <Label>Important: what the package does not include</Label>
          <Title>Accommodation, reserve fees and activities are booked separately</Title>
          <Body>
            These rates cover your vehicle, chauffeur, fuel, tolls, parking and the driver&apos;s accommodation and meals throughout. Your own accommodation, reserve fees, game drives and activities are booked separately. We arrange all of it for you and it is billed at cost, so tell us your preference and we will send the full picture including lodging.
          </Body>
        </Callout>
      </Container>
    </Wrapper>
  );
}
