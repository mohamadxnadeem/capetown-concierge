"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import { trackWhatsAppClick } from "../../../lib/tracking";

const Wrapper = styled.div`
  margin-top: 34px;
  padding: 26px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  text-align: center;
`;

const Title = styled.h2`
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
  tourTitle: string;
  buttonLabel?: string;
  title?: string;
  body?: string;
};

export default function PrivateTourMidCta({
  whatsappLink,
  tourTitle,
  buttonLabel,
  title,
  body,
}: Props) {
  return (
    <Wrapper>
      <Title>{title || "Ready to See the Cape Peninsula?"}</Title>
      <Text>
        {body || "Most guests tell us the Peninsula is the highlight of their entire Cape Town trip. Don't leave it to chance with a shared tour bus — message us and we'll plan the day around you."}
      </Text>

      <CTA
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackWhatsAppClick({
            source: "private_tour_mid_cta",
            label: "Check Availability",
            tour: tourTitle,
          })
        }
      >
        <Button as="span">{buttonLabel || "Check Availability — We Respond in 30 Minutes"}</Button>
      </CTA>
    </Wrapper>
  );
}