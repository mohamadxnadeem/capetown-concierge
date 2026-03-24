"use client";

import styled from "styled-components";
import Button from "../../common/Button";

const Bar = styled.div`
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 16px;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px;
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.92);
  backdrop-filter: blur(14px);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.22);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    left: 24px;
    right: 24px;
    max-width: 860px;
    margin: 0 auto;
  }
`;

const Copy = styled.div`
  min-width: 0;
`;

const Title = styled.div`
  color: white;
  font-weight: 700;
  font-size: 0.98rem;
  line-height: 1.2;
  margin-bottom: 2px;
`;

const Subtext = styled.div`
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.84rem;
  line-height: 1.3;
`;

const CTAAnchor = styled.a`
  display: inline-flex;
  flex: 0 0 auto;
  text-decoration: none;
`;

type Props = {
  title: string;
  whatsappLink: string;
  priceText?: string;
};

export default function PrivateTourStickyBar({
  title,
  whatsappLink,
  priceText,
}: Props) {
  return (
    <Bar>
      <Copy>
        <Title>{title}</Title>
        <Subtext>{priceText || "Private tour"} • Check availability now</Subtext>
      </Copy>

      <CTAAnchor href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <Button as="span">Book on WhatsApp</Button>
      </CTAAnchor>
    </Bar>
  );
}