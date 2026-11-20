"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import { trackWhatsAppClick } from "../../../lib/tracking";

import { useT } from "../../../lib/i18n/LocaleContext";
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
  const tt = useT();
  return (
    <Wrapper>
      <Title>{title || tt("PrivateTourMidCta.ready-to-see-the-cape")}</Title>
      <Text>
        {body || tt("PrivateTourMidCta.most-guests-tell-us-the")}
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
        <Button as="span">{buttonLabel || tt("PrivateTourMidCta.check-availability-we-respond-in")}</Button>
      </CTA>
    </Wrapper>
  );
}