"use client";

import Link from "next/link";
import styled from "styled-components";
import { RelatedVehicle } from "./types";

type Props = {
  items: RelatedVehicle[];
};

function normalizeUsdPrice(price?: string) {
  if (!price) return "";

  return price
    .replace(/^From\s+R/i, "From $")
    .replace(/^R/i, "$")
    .replace(/\s+R(?=\d)/gi, " $");
}

const Title = styled.h2`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.95rem;
  line-height: 1.12;
`;

const RelatedGrid = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const RelatedCard = styled(Link)`
  display: block;
  text-decoration: none;
  overflow: hidden;
  border-radius: 22px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const RelatedImage = styled.div<{ $image?: string }>`
  height: 230px;
  background: ${({ $image }) =>
    $image
      ? `linear-gradient(to top, rgba(0,0,0,0.18), rgba(0,0,0,0.04)), url(${$image})`
      : `linear-gradient(135deg, rgba(11, 91, 51, 0.16), rgba(6, 62, 35, 0.08))`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const RelatedBody = styled.div`
  padding: 22px;
`;

const RelatedTitle = styled.h3`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.16rem;
  line-height: 1.25;
`;

const RelatedMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
`;

const RelatedBadge = styled.div`
  min-height: 34px;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.08);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  font-weight: 700;
`;

const RelatedText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
`;

export default function ChauffeurRelatedVehicles({ items }: Props) {
  if (!items.length) return null;

  return (
    <>
      <Title>Other Vehicles You May Also Like</Title>

      <RelatedGrid>
        {items.map((vehicle, index) => (
          <RelatedCard key={`${vehicle.title}-${index}`} href={vehicle.href}>
            <RelatedImage $image={vehicle.image} />
            <RelatedBody>
              <RelatedTitle>{vehicle.title}</RelatedTitle>

              <RelatedMeta>
                {vehicle.seats ? (
                  <RelatedBadge>{vehicle.seats} Seats</RelatedBadge>
                ) : null}

                {vehicle.price ? (
                  <RelatedBadge>{normalizeUsdPrice(vehicle.price)}</RelatedBadge>
                ) : null}
              </RelatedMeta>

              <RelatedText>
                {vehicle.description ||
                  "Explore another premium chauffeur-driven vehicle in Cape Town."}
              </RelatedText>
            </RelatedBody>
          </RelatedCard>
        ))}
      </RelatedGrid>
    </>
  );
}