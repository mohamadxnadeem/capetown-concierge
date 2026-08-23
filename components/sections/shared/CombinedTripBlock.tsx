"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import { useCurrency } from "../../../context/CurrencyContext";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { buildWhatsAppLink } from "../../../lib/whatsapp";
import {
  Anchor,
  Container,
  Section,
  SectionEyebrow,
  SectionHeader,
  SectionText,
  SectionTitle,
  StyledLink,
} from "../cape-town-itinerary/shared";

const COMBINED_WA_MESSAGE =
  "Hi, I'd like to combine Cape Town and the Garden Route. My dates are:";

const CT_HREF = "/7-day-cape-town-itinerary";
const GR_HREF = "/7-day-garden-route-itinerary";

const Panel = styled.div`
  padding: 28px;
  border-radius: 22px;
  background: linear-gradient(
    135deg,
    rgba(11, 91, 51, 0.08) 0%,
    rgba(6, 62, 35, 0.04) 100%
  );
  border: 1px solid rgba(11, 91, 51, 0.14);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 40px;
  }
`;

const CombinedFigure = styled.div`
  margin: 24px 0 8px;
  padding: 18px 20px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const CombinedLabel = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const CombinedAmount = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.4rem;
  font-weight: 700;
`;

const CombinedAside = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.88rem;
  margin-top: 6px;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 22px;
`;

type Props = {
  orientation: "cape-town" | "garden-route";
  combinedFromZar?: number;
  combinedVehicleTitle?: string;
};

export default function CombinedTripBlock({
  orientation,
  combinedFromZar,
  combinedVehicleTitle,
}: Props) {
  const { format, isReady } = useCurrency();

  const money = (zar: number) =>
    isReady ? format(zar) : `R${Math.round(zar).toLocaleString()}`;

  const waLink = buildWhatsAppLink(COMBINED_WA_MESSAGE);

  const otherLabel =
    orientation === "cape-town"
      ? "See the Garden Route Itinerary"
      : "See the Cape Town Itinerary";
  const otherHref = orientation === "cape-town" ? GR_HREF : CT_HREF;

  return (
    <Section>
      <Container>
        <Panel>
          <SectionHeader>
            <SectionEyebrow>The Fortnight</SectionEyebrow>
            <SectionTitle>Most guests do both</SectionTitle>
            <SectionText>
              Seven days in Cape Town and seven on the Garden Route is the trip people come back and tell us they are glad they did. Same vehicle, same driver, one arrangement across the fortnight.
            </SectionText>
          </SectionHeader>

          {combinedFromZar && combinedFromZar > 0 ? (
            <CombinedFigure>
              <CombinedLabel>14 day combined package</CombinedLabel>
              <CombinedAmount>From {money(combinedFromZar)}</CombinedAmount>
              <CombinedAside>
                {combinedVehicleTitle
                  ? `Based on the ${combinedVehicleTitle} at the multi-day Cape Town rate plus the Garden Route out-of-town rate. Larger vehicles quoted on request.`
                  : "Based on the smallest vehicle. Larger vehicles quoted on request."}
              </CombinedAside>
            </CombinedFigure>
          ) : null}

          <Actions>
            <StyledLink href={otherHref}>
              <Button as="span">{otherLabel}</Button>
            </StyledLink>
            <Anchor
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  source:
                    orientation === "cape-town"
                      ? "cape_town_combined_trip"
                      : "garden_route_combined_trip",
                  label: "Ask About Combined Trip",
                  tour: "14 Day Cape Town + Garden Route",
                })
              }
            >
              <Button as="span" $variant="secondary">
                Ask About the Fortnight
              </Button>
            </Anchor>
          </Actions>
        </Panel>
      </Container>
    </Section>
  );
}
