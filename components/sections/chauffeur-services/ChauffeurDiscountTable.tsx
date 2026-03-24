"use client";

import styled from "styled-components";
import {
  calculateDiscountedRate,
  formatCurrency,
  getDiscountPercent,
} from "./utils";

type Props = {
  baseRate: number;
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
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.95rem;
  line-height: 1.12;
`;

const Text = styled.p`
  margin: 0 0 20px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

const TableWrap = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 14px 12px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 0.9rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 14px 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;
`;

const Strong = styled.span`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
`;

const bands = [
  { label: "1 day", days: 1 },
  { label: "2 days", days: 2 },
  { label: "3 days", days: 3 },
  { label: "4 days", days: 4 },
  { label: "5+ days", days: 5 },
];

export default function ChauffeurDiscountTable({ baseRate }: Props) {
  if (!baseRate) return null;

  return (
    <Card>
      <CardInner>
        <Title>Multi-Day Savings</Title>
        <Text>
          The longer you book, the lower your daily rate becomes. Book 5 days or more
          and enjoy up to 20% off the standard daily rate.
        </Text>

        <TableWrap>
          <Table>
            <thead>
              <tr>
                <Th>Booking Length</Th>
                <Th>Standard Rate</Th>
                <Th>Discount</Th>
                <Th>Your Daily Rate</Th>
              </tr>
            </thead>
            <tbody>
              {bands.map((band) => {
                const discount = getDiscountPercent(band.days);
                const discountedRate = calculateDiscountedRate(baseRate, discount);

                return (
                  <tr key={band.label}>
                    <Td>
                      <Strong>{band.label}</Strong>
                    </Td>
                    <Td>{formatCurrency(baseRate)}</Td>
                    <Td>{discount}% off</Td>
                    <Td>
                      <Strong>{formatCurrency(discountedRate)}</Strong>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </TableWrap>
      </CardInner>
    </Card>
  );
}