"use client";

import styled from "styled-components";
import Button from "../../common/Button";

const Wrapper = styled.div`
  margin-top: 34px;
  padding: 26px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  text-align: center;
`;

const Title = styled.h3`
  margin: 0 0 10px;
  font-size: 1.35rem;
  color: ${({ theme }) => theme.colors.heading};
`;

const Text = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

const CTA = styled.a`
  display: inline-flex;
  text-decoration: none;
`;

type Props = {
  whatsappLink: string;
  vehicleTitle: string;
};

export default function ChauffeurMidCta({
  whatsappLink,
  vehicleTitle,
}: Props) {
  return (
    <Wrapper>
      <Title>Ready to Travel with the {vehicleTitle}?</Title>
      <Text>
        Check availability, ask questions, and plan your airport transfer, private tour,
        or chauffeur booking in minutes.
      </Text>

      <CTA href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <Button as="span">Check Availability on WhatsApp</Button>
      </CTA>
    </Wrapper>
  );
}