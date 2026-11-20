"use client";

import styled from "styled-components";
import Money from "../../common/Money";

import { useT, useTl } from "../../../lib/i18n/LocaleContext";
type Props = {
  title: string;
  vehicleType?: string;
  seats?: number;
  luggage?: number;
  priceUsd?: number;
};

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const CardInner = styled.div`
  padding: 28px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 34px;
  }
`;

const Title = styled.h2`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.95rem;
  line-height: 1.12;
`;

const QuickStats = styled.div`
  display: grid;
  gap: 14px;
`;

const QuickStat = styled.div`
  padding: 16px 18px;
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.backgroundSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const QuickStatLabel = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.84rem;
  margin-bottom: 6px;
`;

const QuickStatValue = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  line-height: 1.35;
`;

export default function ChauffeurQuickDetails({
  title,
  vehicleType,
  seats,
  luggage,
  priceUsd,
}: Props) {
  const tt = useT();
  const tl = useTl();
  return (
    <Card>
      <CardInner>
        <Title>{tt("ChauffeurQuickDetails.quick-details")}</Title>

        <QuickStats>
          <QuickStat>
            <QuickStatLabel>{tt("ChauffeurQuickDetails.vehicle")}</QuickStatLabel>
            <QuickStatValue>{title}</QuickStatValue>
          </QuickStat>

          {vehicleType ? (
            <QuickStat>
              <QuickStatLabel>{tt("ChauffeurQuickDetails.vehicle-type")}</QuickStatLabel>
              <QuickStatValue>{tl(vehicleType)}</QuickStatValue>
            </QuickStat>
          ) : null}

          {seats ? (
            <QuickStat>
              <QuickStatLabel>{tt("ChauffeurQuickDetails.passenger-capacity")}</QuickStatLabel>
              <QuickStatValue>{seats} {tt("ChauffeurQuickDetails.seats")}</QuickStatValue>
            </QuickStat>
          ) : null}

          {luggage ? (
            <QuickStat>
              <QuickStatLabel>{tt("ChauffeurQuickDetails.luggage-capacity")}</QuickStatLabel>
              <QuickStatValue>{luggage} {tt("ChauffeurQuickDetails.bags")}</QuickStatValue>
            </QuickStat>
          ) : null}

          {priceUsd ? (
            <QuickStat>
              <QuickStatLabel>{tt("ChauffeurQuickDetails.day-rate-up-to-8")}</QuickStatLabel>
              <QuickStatValue><Money usd={priceUsd} /></QuickStatValue>
            </QuickStat>
          ) : null}
        </QuickStats>
      </CardInner>
    </Card>
  );
}