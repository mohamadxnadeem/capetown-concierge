"use client";

import styled from "styled-components";
import ApproxPrice from "../../common/ApproxPrice";
import { V_CLASS_PATH } from "./utils";
import Link from "next/link";

type Props = {
  title: string;
  vehicleType?: string;
  seats?: number;
  luggage?: number;
  priceZar?: number;
  showVClassUpsell?: boolean;
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

const CapacityNote = styled.p`
  margin: 18px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
  line-height: 1.7;

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
    text-decoration: underline;
  }
`;

export default function ChauffeurQuickDetails({
  title,
  vehicleType,
  seats,
  luggage,
  priceZar,
  showVClassUpsell,
}: Props) {
  return (
    <Card>
      <CardInner>
        <Title>Quick Details</Title>

        <QuickStats>
          <QuickStat>
            <QuickStatLabel>Vehicle</QuickStatLabel>
            <QuickStatValue>{title}</QuickStatValue>
          </QuickStat>

          {vehicleType ? (
            <QuickStat>
              <QuickStatLabel>Vehicle Type</QuickStatLabel>
              <QuickStatValue>{vehicleType}</QuickStatValue>
            </QuickStat>
          ) : null}

          {seats ? (
            <QuickStat>
              <QuickStatLabel>Passenger Capacity</QuickStatLabel>
              <QuickStatValue>{seats} Seats</QuickStatValue>
            </QuickStat>
          ) : null}

          {luggage ? (
            <QuickStat>
              <QuickStatLabel>Luggage Capacity</QuickStatLabel>
              <QuickStatValue>{luggage} Bags</QuickStatValue>
            </QuickStat>
          ) : null}

          {priceZar ? (
            <QuickStat>
              <QuickStatLabel>Pricing</QuickStatLabel>
              <QuickStatValue><ApproxPrice zar={priceZar} /></QuickStatValue>
            </QuickStat>
          ) : null}
        </QuickStats>
        {seats ? (
          <CapacityNote>
            Seats {seats} guests{luggage ? ` with ${luggage} bags` : ""}.
            {showVClassUpsell ? (
              <>
                {" "}
                Travelling with family or extra luggage? Ask about our{" "}
                <Link href={V_CLASS_PATH}>Mercedes V-Class</Link>.
              </>
            ) : null}
          </CapacityNote>
        ) : null}
      </CardInner>
    </Card>
  );
}